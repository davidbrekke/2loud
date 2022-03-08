import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { extractFile } from '@lib/extractFile'

const useAddTrack = () => {
  const { user } = useAuth()
  const router = useRouter()

  // track state
  const [title, setTitle] = useState('')
  const [addingTrack, setAddingTrack] = useState(false)

  // track artwork state
  const [artworkUrl, setArtworkUrl] = useState(null)
  const [artworkPreview, setArtworkPreview] = useState(null)
  const [artworkFile, setArtworkFile] = useState(null)
  const [uploadingArtwork, setUploadingArtwork] = useState(false)

  // track audio state
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioPreview, setAudioPreview] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [uploadingAudio, setUploadingAudio] = useState(false)

  // change artwork state when file is selected
  const handleArtworkChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      const { file, localUrl, fileName } = extractFile(evt, user)
      // set artwork preview
      setArtworkPreview(localUrl)
      // set artwork url
      setArtworkUrl(fileName)
      // set artwork file
      setArtworkFile(file)
    } catch (error) {
      console.log(error.message)
    }
  }

  // change audio state when file is selected
  const handleAudioChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      const { file, localUrl, fileName } = extractFile(evt, user)
      // set audio preview
      setAudioPreview(localUrl)
      // set audio url
      setAudioUrl(fileName)
      // set audio file
      setAudioFile(file)
    } catch (error) {
      console.log(error.message)
    }
  }

  // upload artwork and audio to storage and add track to db
  const handleAddTrack = async () => {
    try {
      // upload artwork
      if (artworkFile) {
        setUploadingArtwork(true)
        const { error: uploadArtworkError } = await supabase.storage
          .from('artwork')
          .upload(artworkUrl, artworkFile)

        if (uploadArtworkError) {
          console.log('upload artwork error', uploadArtworkError)
          throw uploadArtworkError
        }
        setUploadingArtwork(false)
      }

      // upload audio
      if (audioFile) {
        setUploadingAudio(true)
        const { error: uploadAudioError } = await supabase.storage
          .from('audio')
          .upload(audioUrl, audioFile)

        if (uploadAudioError) {
          console.log('upload audio error', uploadAudioError)
          throw uploadAudioError
        }
        setUploadingAudio(false)
      }

      // add track
      setAddingTrack(true)
      let { error: uploadTrackError } = await supabase.from('tracks').insert([
        {
          title,
          artwork_url: artworkUrl,
          audio_url: audioUrl,
          artist_id: user.id,
        },
      ])

      if (uploadTrackError) {
        throw uploadTrackError
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      // after adding track, redirect to profile page
      router.push('/profile')
    }
  }

  return {
    title,
    setTitle,
    artworkUrl,
    artworkPreview,
    audioUrl,
    audioPreview,
    uploadingArtwork,
    uploadingAudio,
    addingTrack,
    handleArtworkChange,
    handleAudioChange,
    handleAddTrack,
  }
}

export { useAddTrack }

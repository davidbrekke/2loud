import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { extractFile } from '@lib/extractFile'

const useAddTrack = () => {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  // track state
  const [title, setTitle] = useState('')

  // track artwork state
  const [artworkUrl, setArtworkUrl] = useState(null)
  const [artworkPreview, setArtworkPreview] = useState(null)
  const [artworkFile, setArtworkFile] = useState(null)

  // track audio state
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioPreview, setAudioPreview] = useState(null)
  const [audioFile, setAudioFile] = useState(null)

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
        const { error: uploadArtworkError } = await supabase.storage
          .from('artwork')
          .upload(artworkUrl, artworkFile)

        if (uploadArtworkError) {
          console.log('upload artwork error', uploadArtworkError)
          throw uploadArtworkError
        }
      }

      // upload audio
      if (audioFile) {
        const { error: uploadAudioError } = await supabase.storage
          .from('audio')
          .upload(audioUrl, audioFile)

        if (uploadAudioError) {
          console.log('upload audio error', uploadAudioError)
          throw uploadAudioError
        }
      }

      // add track
      const { data: uploadTrackData, error: uploadTrackError } = await supabase
        .from('tracks')
        .insert([
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
      return uploadTrackData
    } catch (error) {
      console.log(error.message)
    }
  }

  const {
    mutateAsync: addTrack,
    isLoading,
    isError,
    error,
  } = useMutation(handleAddTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks'])
      router.push(`/profile`)
    },
  })

  return {
    title,
    setTitle,
    artworkUrl,
    artworkPreview,
    audioUrl,
    audioPreview,
    handleArtworkChange,
    handleAudioChange,
    addTrack,
    isLoading,
    isError,
    error,
  }
}

export { useAddTrack }

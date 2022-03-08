import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { extractFile } from '@lib/extractFile'
import { downloadAudioAsUrl } from '@lib/downloadAudio'
import { downloadArtworkAsUrl } from '@lib/downloadArtwork'
import { Track } from 'types/track'

// TODO: delete old artwork and audio files if new artwork or audio is uploaded

const useEditTrack = (track: Track) => {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  // track state
  const [title, setTitle] = useState(track.title)
  const [newTitle, setNewTitle] = useState(false)

  // track artwork state
  const [artworkUrl, setArtworkUrl] = useState(track.artwork_url)
  const [artworkPreview, setArtworkPreview] = useState(null)
  const [artworkFile, setArtworkFile] = useState(null)
  const [newArtwork, setNewArtwork] = useState(false)

  // track audio state
  const [audioUrl, setAudioUrl] = useState(track.audio_url)
  const [audioPreview, setAudioPreview] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [newAudio, setNewAudio] = useState(false)

  // download audio and artwork from storage when page loads
  // and set local files as preview
  useEffect(() => {
    downloadArtwork(artworkUrl)
    downloadAudio(audioUrl)
  }, [])

  // download artwork from storage, create local url, and set local url as preview
  const downloadArtwork = async (path: string) => {
    try {
      const localArtworkUrl = await downloadArtworkAsUrl(path)
      setArtworkPreview(localArtworkUrl)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  // download audio from storage, create local url, and set local url as preview
  const downloadAudio = async (path: string) => {
    try {
      const localAudioUrl = await downloadAudioAsUrl(path)
      setAudioPreview(localAudioUrl)
    } catch (error) {
      console.log('Error downloading audio: ', error.message)
    }
  }

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
      // set new artwork as true if not already
      !newArtwork && setNewArtwork(true)
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
      // set new audio as true if not already
      !newAudio && setNewAudio(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpdateTrack = async () => {
    try {
      // upload new artwork
      if (newArtwork && artworkFile) {
        const { error: uploadArtworkError } = await supabase.storage
          .from('artwork')
          .upload(artworkUrl, artworkFile)

        if (uploadArtworkError) {
          console.log('updating artwork error', uploadArtworkError)
          throw uploadArtworkError
        }
      }

      // upload new audio
      if (newAudio && audioFile) {
        const { error: uploadAudioError } = await supabase.storage
          .from('audio')
          .upload(audioUrl, audioFile)

        if (uploadAudioError) {
          console.log('updating audio error', uploadAudioError)
          throw uploadAudioError
        }
      }

      // update track
      const { data: updateTrackData, error: updateError } = await supabase
        .from('tracks')
        .upsert({
          id: track.id,
          title,
          artwork_url: artworkUrl,
          audio_url: audioUrl,
          artist_id: user.id,
          updated_at: new Date(),
        })
      if (updateError) {
        throw updateError
      }
      return updateTrackData
    } catch (error) {
      console.log(error.message)
    }
  }

  const {
    mutateAsync: updateTrack,
    isLoading,
    isError,
    error,
  } = useMutation(handleUpdateTrack, {
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
    setNewTitle,
    newTitle,
    newArtwork,
    newAudio,
    updateTrack,
    isLoading,
    isError,
    error,
  }
}

export { useEditTrack }

import { useRouter } from 'next/router'
import {
  useState,
  useEffect,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { extractFile } from '@lib/extractFile'
import { downloadAudioAsUrl } from '@lib/downloadAudio'
import { downloadArtworkAsUrl } from '@lib/downloadArtwork'
import { ITrack } from '@lib/types/track'

// TODO: delete old artwork and audio files if new artwork or audio is uploaded

interface UseEditTrackReturn {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  artworkUrl: string
  artworkPreview: string
  audioUrl: string
  audioPreview: string
  handleArtworkChange: (evt: ChangeEvent<HTMLInputElement>) => void
  handleAudioChange: (evt: ChangeEvent<HTMLInputElement>) => void
  setNewTitle: Dispatch<SetStateAction<boolean>>
  newTitle: boolean
  newArtwork: boolean
  newAudio: boolean
  updateTrack: () => void
  isLoading: boolean
  isError: boolean
}

const useEditTrack = (track: ITrack): UseEditTrackReturn => {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  // track state
  const [title, setTitle] = useState<string>(track.title)
  const [newTitle, setNewTitle] = useState<boolean>(false)

  // track artwork state
  const [artworkUrl, setArtworkUrl] = useState<string>(track.artwork_url)
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null)
  const [artworkFile, setArtworkFile] = useState<File | null>(null)
  const [newArtwork, setNewArtwork] = useState<boolean>(false)

  // track audio state
  const [audioUrl, setAudioUrl] = useState<string>(track.audio_url)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [newAudio, setNewAudio] = useState<boolean>(false)

  // download audio and artwork from storage when page loads
  // and set local files as preview
  useEffect(() => {
    downloadArtwork(artworkUrl)
    downloadAudio(audioUrl)
  }, [])

  // download artwork from storage, create local url, and set local url as preview
  const downloadArtwork = async (path: string): Promise<void> => {
    try {
      const localArtworkUrl = await downloadArtworkAsUrl(path)
      setArtworkPreview(localArtworkUrl)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
      throw error
    }
  }

  // download audio from storage, create local url, and set local url as preview
  const downloadAudio = async (path: string): Promise<void> => {
    try {
      const localAudioUrl = await downloadAudioAsUrl(path)
      setAudioPreview(localAudioUrl)
    } catch (error) {
      console.log('Error downloading audio: ', error.message)
      throw error
    }
  }

  // change artwork state when file is selected
  const handleArtworkChange = async (
    evt: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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
      throw error
    }
  }

  // change audio state when file is selected
  const handleAudioChange = async (
    evt: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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
      throw error
    }
  }

  const handleUpdateTrack = async (): Promise<ITrack[]> => {
    try {
      // upload new artwork
      if (newArtwork && artworkFile) {
        const { error: uploadArtworkError } = await supabase.storage
          .from('artwork')
          .upload(artworkUrl, artworkFile)
        if (uploadArtworkError) throw uploadArtworkError
      }

      // upload new audio
      if (newAudio && audioFile) {
        const { error: uploadAudioError } = await supabase.storage
          .from('audio')
          .upload(audioUrl, audioFile)
        if (uploadAudioError) throw uploadAudioError
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
      if (updateError) throw updateError

      // return updated track
      return updateTrackData
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  // update track mutation
  const {
    mutateAsync: updateTrack,
    isLoading,
    isError,
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
  }
}

export { useEditTrack }

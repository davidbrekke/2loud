import { useRouter } from 'next/router'
import { ChangeEvent, useState, SetStateAction, Dispatch } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { extractFile } from '@lib/extractFile'
import { ITrack } from '@lib/types/track'

interface UseAddTrackReturn {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  artworkUrl: string
  artworkPreview: string
  audioUrl: string
  audioPreview: string
  handleArtworkChange: (evt: ChangeEvent<HTMLInputElement>) => void
  handleAudioChange: (evt: ChangeEvent<HTMLInputElement>) => void
  addTrack: () => void
  isLoading: boolean
  isError: boolean
}

const useAddTrack = (): UseAddTrackReturn => {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  // track state
  const [title, setTitle] = useState<string>('')

  // track artwork state
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null)
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null)
  const [artworkFile, setArtworkFile] = useState<File | null>(null)

  // track audio state
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)

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
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  // upload artwork and audio to storage and add track to db
  const handleAddTrack = async (): Promise<ITrack[]> => {
    try {
      // upload artwork
      if (artworkFile) {
        const { error: uploadArtworkError } = await supabase.storage
          .from('artwork')
          .upload(artworkUrl, artworkFile)
        if (uploadArtworkError) throw uploadArtworkError
      }

      // upload audio
      if (audioFile) {
        const { error: uploadAudioError } = await supabase.storage
          .from('audio')
          .upload(audioUrl, audioFile)
        if (uploadAudioError) throw uploadAudioError
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
      if (uploadTrackError) throw uploadTrackError

      // return track
      return uploadTrackData
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  // add track mutation
  const {
    mutateAsync: addTrack,
    isLoading,
    isError,
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
  }
}

export { useAddTrack }

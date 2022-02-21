import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'

const useEditTrack = (track) => {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState(track.title)
  const [artworkUrl, setArtworkUrl] = useState(track.artwork_url)
  const [artworkPreview, setArtworkPreview] = useState(null)
  const [audioUrl, setAudioUrl] = useState(track.audio_url)
  const [audioPreview, setAudioPreview] = useState(null)
  const [uploadingArtwork, setUploadingArtwork] = useState(false)
  const [uploadingAudio, setUploadingAudio] = useState(false)
  const [updatingTrack, setUpdatingTrack] = useState(false)

  useEffect(() => {
    downloadArtwork(artworkUrl)
    downloadAudio(audioUrl)
  }, [])

  const downloadArtwork = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('artwork')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setArtworkPreview(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }
  const downloadAudio = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('audio')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAudioPreview(url)
    } catch (error) {
      console.log('Error downloading audio: ', error.message)
    }
  }

  const handleArtworkChange = async (e) => {
    try {
      setUploadingArtwork(true)

      if (!e.target.files || e.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const file = e.target.files[0]
      setArtworkPreview(URL.createObjectURL(file))
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.floor(
        Math.random() * 10000
      )}.${fileExt}`
      const filePath = `${fileName}`
      setArtworkUrl(filePath)

      let { error: uploadError } = await supabase.storage
        .from('artwork')
        .upload(filePath, file)

      if (uploadError) {
        console.log('upload errorrrrr', uploadError)
        throw uploadError
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setUploadingArtwork(false)
    }
  }
  const handleAudioChange = async (e) => {
    try {
      setUploadingAudio(true)

      if (!e.target.files || e.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const file = e.target.files[0]
      setAudioPreview(URL.createObjectURL(file))

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.floor(
        Math.random() * 10000
      )}.${fileExt}`
      const filePath = `${fileName}`
      setAudioUrl(filePath)

      let { error: uploadError } = await supabase.storage
        .from('audio')
        .upload(filePath, file)

      if (uploadError) {
        console.log('upload errorrrrr', uploadError)
        throw uploadError
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setUploadingAudio(false)
    }
  }
  const handleUpdateTrack = async () => {
    try {
      setUpdatingTrack(true)
      const { data: trackData, error: updateError } = await supabase
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
    } catch (error) {
      console.log(error.message)
    } finally {
      setUpdatingTrack(false)
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
    updatingTrack,
    handleArtworkChange,
    handleAudioChange,
    handleUpdateTrack,
  }
}

export { useEditTrack }

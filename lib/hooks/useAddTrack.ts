import { useRouter } from 'next/router'
import { useState } from 'react'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'

const useAddTrack = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [artworkUrl, setArtworkUrl] = useState(null)
  const [artworkPreview, setArtworkPreview] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioPreview, setAudioPreview] = useState(null)
  const [uploadingArtwork, setUploadingArtwork] = useState(false)
  const [uploadingAudio, setUploadingAudio] = useState(false)
  const [addingTrack, setAddingTrack] = useState(false)

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
  const handleAddTrack = async () => {
    try {
      setAddingTrack(true)
      let { error: uploadError } = await supabase.from('tracks').insert([
        {
          title,
          artwork_url: artworkUrl,
          audio_url: audioUrl,
          artist_id: user.id,
        },
      ])

      if (uploadError) {
        throw uploadError
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setTitle('')
      setArtworkUrl(null)
      setArtworkPreview(null)
      setAudioUrl(null)
      setAudioPreview(null)
      setAddingTrack(false)
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

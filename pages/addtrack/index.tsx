import Image from 'next/image'
import { useRouter } from 'next/router'

import { useState } from 'react'
import Layout from '@components/layout'
import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'

const AddTrack = () => {
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

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center">
        {addingTrack ? (
          <h1>adding track</h1>
        ) : (
          <>
            <h1>Add Track</h1>
            <div>
              <div>
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="title">artwork</label>
                <input
                  type="file"
                  name="artwork"
                  accept="image/*"
                  onChange={handleArtworkChange}
                />
                {uploadingArtwork && <span>uploading</span>}
                {artworkPreview && (
                  <Image width={150} height={150} src={artworkPreview} />
                )}
              </div>
              <div>
                <label htmlFor="title">audio</label>
                <input
                  type="file"
                  name="audio"
                  accept="audio/*"
                  onChange={handleAudioChange}
                />
                {uploadingAudio && <span>uploading</span>}
                {audioPreview && <audio controls src={audioPreview} />}
              </div>
            </div>
            {title && audioUrl && artworkUrl && (
              <div
                onClick={handleAddTrack}
                className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500"
              >
                add track
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default AddTrack

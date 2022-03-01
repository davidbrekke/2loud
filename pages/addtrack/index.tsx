import Image from 'next/image'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

import Layout from '@components/layout'
import { useAddTrack } from '@lib/hooks/useAddTrack'

const AddTrack = () => {
  const {
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
  } = useAddTrack()

  const isFormComplete = title && audioUrl && artworkUrl

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center text-gray-700">
        {addingTrack ? (
          <h1>adding track</h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">add track</h1>
            <div className="flex flex-col items-center space-y-6">
              {/* TITLE */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-lg text-gray-500 ml-2">
                  title
                </label>
                <input
                  type="text"
                  value={title}
                  name="title"
                  className="rounded-md text-xl outline-none bg-white bg-opacity-30 py-2 px-4 shadow-lg transition focus:shadow-2xl"
                  placeholder="title..."
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* FILES */}
              <div className="flex flex-col md:flex-row">
                {/* ARTWORK */}
                <div className="flex flex-col items-center p-2">
                  <label htmlFor="title" className="text-lg text-gray-500 ml-2">
                    artwork
                  </label>
                  <input
                    type="file"
                    name="artwork"
                    accept="image/*"
                    onChange={handleArtworkChange}
                    className="text-gray-600 p-2"
                  />
                  {artworkPreview ? (
                    <Image
                      width={200}
                      height={200}
                      src={artworkPreview}
                      alt="artwork preview"
                    />
                  ) : (
                    <div className="overflow-hidden rounded-xl w-48 h-48 bg-white bg-opacity-30 text-gray-400 flex items-center justify-center shadow-lg">
                      preview
                    </div>
                  )}
                  {uploadingArtwork && <span>uploading</span>}
                </div>
                {/* AUDIO */}
                <div className="flex flex-col items-center p-2">
                  <label htmlFor="title" className="text-lg text-gray-500 ml-2">
                    audio
                  </label>
                  <input
                    type="file"
                    name="audio"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="text-gray-600 p-2"
                  />
                  {audioPreview && <audio controls src={audioPreview} />}
                  {uploadingAudio && <span>uploading</span>}
                </div>
              </div>

              {/* SUBMIT */}
              {isFormComplete ? (
                <div
                  onClick={handleAddTrack}
                  className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500"
                >
                  add track
                </div>
              ) : (
                <div className="px-4 py-2 rounded-lg text-gray-100 shadow-lg text-lg bg-white bg-opacity-30">
                  add track
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default AddTrack

export const getServerSideProps = withAuthRequired({
  redirectTo: '/signin',
})

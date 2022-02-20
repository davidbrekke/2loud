import Image from 'next/image'

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

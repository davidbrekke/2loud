import { useContext } from 'react'

import { GlobalTrackContext } from '@lib/contexts/GlobalTrackContext'
import { TrackContext } from '@lib/contexts/TrackContext'
import { downloadAudioAsUrl } from '@lib/downloadAudio'

const TrackContainer = ({ children }) => {
  const track = useContext(TrackContext)

  const {
    currentTrack,
    setCurrentTrack,
    setAudioUrl,
    isPlaying,
    setIsPlaying,
  } = useContext(GlobalTrackContext)
  return (
    <div
      className={`flex flex-row cursor-pointer items-center justify-between p-4 md:p-8 space-x-2 rounded-3xl transition ${
        currentTrack === track
          ? 'bg-white bg-opacity-50 shadow-xl hover:shadow-2xl'
          : 'bg-white bg-opacity-20 hover:bg-opacity-30'
      } hover:scale-105`}
      onClick={async () => {
        if (isPlaying && currentTrack === track) return
        setIsPlaying(false)
        setCurrentTrack(track)
        const url = await downloadAudioAsUrl(track.audio_url)
        console.log('url', url)
        setAudioUrl(url)
      }}
    >
      {children}
    </div>
  )
}

export default TrackContainer

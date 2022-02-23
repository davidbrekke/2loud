import { useContext } from 'react'

import { TrackPlayerContext } from '@lib/contexts/TrackPlayerContext'
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
  } = useContext(TrackPlayerContext)

  return (
    <div
      className={`flex flex-row cursor-pointer items-center justify-between p-4 md:p-8 space-x-2 rounded-3xl transition hover:scale-105 ${
        currentTrack === track
          ? 'bg-white bg-opacity-40 shadow-xl hover:shadow-2xl'
          : 'bg-white bg-opacity-20 hover:bg-opacity-30 shadow-lg hover:shadow-xl'
      }`}
      onClick={async () => {
        const sameTrack = currentTrack === track
        if (isPlaying && sameTrack) return
        setIsPlaying(false)
        setCurrentTrack(track)
        const url = await downloadAudioAsUrl(track.audio_url)
        setAudioUrl(url)
      }}
    >
      {children}
    </div>
  )
}

export default TrackContainer

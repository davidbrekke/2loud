import { useRef, useEffect, useState } from 'react'

import Volume from '@components/trackPlayer/Volume'
import PlayPause from '@components/trackPlayer/PlayPause'
import { TrackPlayerContext } from '@lib/contexts/TrackPlayerContext'
import { downloadAudioAsUrl } from '@lib/downloadAudio'

const TrackPlayer = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  const audioPlayer = useRef()
  const progressBar = useRef()

  const download = async () =>
    (await currentTrack) && downloadAudioAsUrl(currentTrack?.audio_url)
  useEffect(() => {
    const url = download()
    currentTrack && setAudioUrl(url)
  }, [currentTrack])

  const TrackPlayerProviderValue = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    audioPlayer,
    progressBar,
    audioUrl,
    setAudioUrl,
  }

  return (
    <TrackPlayerContext.Provider value={TrackPlayerProviderValue}>
      <div className="flex flex-row items-center w-full max-w-6xl justify-around px-2 py-6 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <audio src={audioUrl} ref={audioPlayer} loop preload="metadata" />
        <PlayPause
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioPlayerRef={audioPlayer}
        />
        <h2 className="text-xl md:text-2xl text-gray-600 font-bold truncate">
          {currentTrack ? (
            currentTrack.title
          ) : (
            <span className="text-gray-500 font-normal">select a track</span>
          )}
        </h2>
        <Volume />
      </div>
      {children}
    </TrackPlayerContext.Provider>
  )
}

export default TrackPlayer

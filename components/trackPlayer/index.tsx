import { useRef, useContext, useEffect } from 'react'

import Volume from '@components/trackPlayer/Volume'
import PlayPause from '@components/trackPlayer/PlayPause'
import { GlobalTrackContext } from '@lib/contexts/GlobalTrackContext'
import { downloadAudioAsUrl } from '@lib/downloadAudio'

const TrackPlayer = () => {
  const {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    setAudioPlayer,
    audioUrl,
    setAudioUrl,
  } = useContext(GlobalTrackContext)

  const audioPlayerRef = useRef()
  const progressBarRef = useRef()

  const download = async () => await downloadAudioAsUrl(currentTrack?.audio_url)
  useEffect(() => {
    setAudioPlayer(audioPlayerRef.current)
    const url = download()
    currentTrack && setAudioUrl(url)
  }, [currentTrack])

  return (
    currentTrack && (
      <div className="flex flex-row items-center w-full max-w-6xl justify-around py-4 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <audio src={audioUrl} ref={audioPlayerRef} loop />
        <PlayPause
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioPlayerRef={audioPlayerRef}
        />
        <div className="flex flex-col space-y-2 items-center">
          <h2>{currentTrack.title}</h2>
          <input
            type="range"
            className="w-72"
            defaultValue="0"
            ref={progressBarRef}
            // onChange={changeRange}
          />
          <div className="flex flex-row justify-between items-center w-full text-xs">
            <span>00:00</span>
            <span>00:00</span>
          </div>
        </div>
        <Volume />
      </div>
    )
  )
}

export default TrackPlayer

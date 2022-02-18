import { useRef } from 'react'
import Volume from '@components/trackPlayer/Volume'
import PlayPause from '@components/trackPlayer/PlayPause'

const TrackPlayer = () => {
  const audioPlayer = useRef()
  const progressBar = useRef()
  return (
    <div className="flex flex-row items-center w-full max-w-6xl justify-around py-4 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <audio src={''} ref={audioPlayer} />
      <PlayPause />
      <div className="flex flex-col space-y-2 items-center">
        <h2>title</h2>
        <input
          type="range"
          className="w-72"
          defaultValue="0"
          ref={progressBar}
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
}

export default TrackPlayer

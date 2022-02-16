import Volume from '@components/trackPlayer/Volume'
import PlayPause from '@components/trackPlayer/PlayPause'

const TrackPlayer = () => {
  return (
    <div className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <PlayPause />
      <div>waveform</div>
      <Volume />
    </div>
  )
}

export default TrackPlayer

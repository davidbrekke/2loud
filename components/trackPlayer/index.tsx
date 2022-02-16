import { PlayIcon, VolumeUpIcon } from '@heroicons/react/outline'

const TrackPlayer = () => {
  return (
    <div className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <PlayIcon className="w-10 h-10 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125" />
      <div>waveform</div>
      <VolumeUpIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125" />
    </div>
  )
}

export default TrackPlayer

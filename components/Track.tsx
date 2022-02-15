import {
  FireIcon,
  PlayIcon,
  PauseIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useState } from 'react'

const Track = ({ track }) => {
  return (
    <TrackContainer>
      <CoverArt track={track} />
      <TrackDetails track={track} />
      <TrackIcons />
    </TrackContainer>
  )
}

export default Track

const TrackContainer = ({ children }) => (
  <div className="flex flex-row items-center justify-between p-4 w-96 rounded-3xl transition bg-white bg-opacity-20 hover:bg-opacity-30 hover:scale-105">
    {children}
  </div>
)

const TrackIcons = () => (
  <div className="flex flex-col space-y-4">
    <FireIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110 hover:text-orange-300" />
    <PlayPause />
    <ShoppingBagIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110" />
  </div>
)

const PlayPause = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  return isPlaying ? (
    <PauseIcon
      className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={() => setIsPlaying(!isPlaying)}
    />
  ) : (
    <PlayIcon
      className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={() => setIsPlaying(!isPlaying)}
    />
  )
}

const CoverArt = ({ track }) => (
  <Image src={track.artwork} width={150} height={150} className="rounded-2xl" />
)

const TrackDetails = ({ track }) => (
  <div className="flex flex-col space-y-2 -ml-16">
    <h2 className="text-xl font-bold text-gray-700">{track.title}</h2>
    <h3 className="text-lg text-gray-600">{track.artist}</h3>
  </div>
)

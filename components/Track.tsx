import {
  FireIcon,
  PlayIcon,
  PauseIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'

const Track = ({ track }) => {
  return (
    <div className="flex flex-row items-center justify-between p-4 w-96 m-auto rounded-3xl transition bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-105">
      <Image
        src={track.artwork}
        width={150}
        height={150}
        className="rounded-2xl"
      />
      <div className="flex flex-col space-y-2 -ml-16">
        <h2 className="text-xl font-bold text-gray-700">{track.title}</h2>
        <h3 className="text-lg text-gray-600">{track.artist}</h3>
      </div>
      <div className="flex flex-col space-y-3">
        <FireIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110" />
        <PlayIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110" />
        <ShoppingBagIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110" />
      </div>
    </div>
  )
}

export default Track

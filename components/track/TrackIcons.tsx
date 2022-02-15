import {
  FireIcon,
  PlayIcon,
  PauseIcon,
  DownloadIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'

import { downloadTrack } from '@lib/downloadTrack'

const TrackIcons = () => (
  <div className="flex flex-col space-y-4 items-center">
    <FireIcon className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110 hover:text-orange-300" />
    <PlayPause />
    <DownloadIcon
      className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={downloadTrack}
    />
  </div>
)

export default TrackIcons

const PlayPause = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  return isPlaying ? (
    <PauseIcon
      className="w-10 h-10 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={() => setIsPlaying(!isPlaying)}
    />
  ) : (
    <PlayIcon
      className="w-10 h-10 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={() => setIsPlaying(!isPlaying)}
    />
  )
}

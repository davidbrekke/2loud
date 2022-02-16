import { PlayIcon, PauseIcon } from '@heroicons/react/outline'
import { useState } from 'react'

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

export default PlayPause

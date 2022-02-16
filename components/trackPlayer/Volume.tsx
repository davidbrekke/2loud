import { VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const Volume = () => {
  const [isMuted, setIsMuted] = useState(false)

  return isMuted ? (
    <VolumeUpIcon
      className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125"
      onClick={() => setIsMuted(!isMuted)}
    />
  ) : (
    <VolumeOffIcon
      className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125"
      onClick={() => setIsMuted(!isMuted)}
    />
  )
}

export default Volume

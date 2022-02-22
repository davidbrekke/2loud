import { useContext } from 'react'
import { VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/outline'
import { Icon } from '@components/icon'
import { GlobalTrackContext } from '@lib/contexts/GlobalTrackContext'

const Volume = () => {
  const { isMuted, setIsMuted } = useContext(GlobalTrackContext)

  const toggleVolume = () => {
    const current = isMuted
    setIsMuted(!current)
  }

  return isMuted ? (
    <Icon
      icon={<VolumeUpIcon />}
      onClick={toggleVolume}
      size="lg"
      color="white"
    />
  ) : (
    <Icon
      icon={<VolumeOffIcon />}
      onClick={toggleVolume}
      size="lg"
      color="white"
    />
  )
}

export default Volume

import { PlayIcon, PauseIcon } from '@heroicons/react/outline'

import { Icon } from '@components/icon'

const PlayPause = ({ isPlaying, setIsPlaying, audioPlayerRef }) => {
  const handleClickPauseIcon = () => {
    if (isPlaying) setIsPlaying(false)
    audioPlayerRef.current.pause()
  }

  const handleClickPlayIcon = () => {
    if (!isPlaying) setIsPlaying(true)
    audioPlayerRef.current.play()
  }

  return isPlaying ? (
    <Icon
      icon={<PauseIcon />}
      onClick={handleClickPauseIcon}
      size="xl"
      color="white"
    />
  ) : (
    <Icon
      icon={<PlayIcon />}
      onClick={handleClickPlayIcon}
      size="xl"
      color="white"
    />
  )
}

export default PlayPause

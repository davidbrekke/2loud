import { useState, useRef, useEffect } from 'react'

const useAudioPlayer = ({}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timeJump, setTimeJump] = useState<number>(0)

  // handle time jumps
  useEffect(() => {
    timeTravel(timeJump)
    setIsPlaying(true)
    play()
  }, [timeJump])

  // grabs the loaded metadata
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  // when you get to the end
  useEffect(() => {
    if (Number(duration) > 1 && Number(currentTime) === Number(duration)) {
      togglePlayPause()
      timeTravel(0)
    }
  }, [currentTime, duration])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const play = () => {
    audioPlayer.current.play()
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      play()
    } else {
      audioPlayer.current.pause()
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer?.current.currentTime
    changePlayerCurrentTime()
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  const backThirty = () => {
    timeTravel(Number(progressBar.current.value) - 30)
  }

  const forwardThirty = () => {
    timeTravel(Number(progressBar.current.value) + 30)
  }

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime
    changeRange()
  }

  return {
    isPlaying,
    duration,
    currentTime,
    audioPlayer,
    progressBar,
    calculateTime,
    togglePlayPause,
    changeRange,
    backThirty,
    forwardThirty,
    timeTravel,
    setDuration,
    setIsPlaying,
    setTimeJump,
    play,
  }
}

export { useAudioPlayer }

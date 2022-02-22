import { createContext } from 'react'

export const GlobalTrackContext = createContext({
  currentTrack: null,
  setCurrentTrack: null,
  isPlaying: false,
  setIsPlaying: null,
  isMuted: false,
  setIsMuted: null,
  audioPlayer: null,
  setAudioPlayer: null,
  progressBar: null,
  setProgressBar: null,
  audioUrl: null,
  setAudioUrl: null,
})

import { createContext } from 'react'

export const TrackPlayerContext = createContext({
  currentTrack: null,
  setCurrentTrack: null,
  isPlaying: false,
  setIsPlaying: null,
  isMuted: false,
  setIsMuted: null,
  audioPlayer: null,
  progressBar: null,
  audioUrl: null,
  setAudioUrl: null,
})

import { useState } from 'react'

import Layout from '@components/layout'
import TrackList from '@components/trackList'
import TrackPlayer from '@components/trackPlayer'
import { GlobalTrackContext } from '@lib/contexts/GlobalTrackContext'

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [progressBar, setProgressBar] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  const GlobalTrackProviderValue = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    audioPlayer,
    setAudioPlayer,
    progressBar,
    setProgressBar,
    audioUrl,
    setAudioUrl,
  }

  return (
    <GlobalTrackContext.Provider value={GlobalTrackProviderValue}>
      <Layout>
        <TrackList />
        <TrackPlayer />
      </Layout>
    </GlobalTrackContext.Provider>
  )
}

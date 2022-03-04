import { useRef, useEffect, useState } from 'react'

import PlayPause from '@components/trackPlayer/PlayPause'
import { TrackPlayerContext } from '@lib/contexts/TrackPlayerContext'
import { downloadAudioAsUrl } from '@lib/downloadAudio'
import { supabase } from '@lib/supabase'
import { useRouter } from 'next/router'

const TrackPlayer = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [username, setUsername] = useState('')

  const router = useRouter()

  const audioPlayer = useRef()
  const progressBar = useRef()

  const download = async () => {
    return await downloadAudioAsUrl(currentTrack.audio_url)
  }
  useEffect(() => {
    ;(async () => {
      if (!currentTrack) return
      const url = download()
      setAudioUrl(url)

      const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', currentTrack.artist_id)
      if (usernameError) {
        console.error(usernameError)
        return
      }
      setUsername(usernameData[0].username)
    })()
  }, [currentTrack])

  const TrackPlayerProviderValue = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    audioPlayer,
    progressBar,
    audioUrl,
    setAudioUrl,
  }

  const handleUsernameClick = () => router.push(`/${username}`)

  return (
    <TrackPlayerContext.Provider value={TrackPlayerProviderValue}>
      <>
        <div
          className={`flex flex-row items-center justify-center w-max max-w-6xl p-2 rounded-full absolute z-10 bottom-5 left-5 md:bottom-20 md:left-20 bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500 shadow-md hover:shadow-lg hover:scale-105 transition ${
            !currentTrack && 'hidden'
          }`}
        >
          <audio src={audioUrl} ref={audioPlayer} loop preload="metadata" />
          <PlayPause
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioPlayerRef={audioPlayer}
          />
          <div className="flex flex-col pl-2 pr-4">
            <h2 className="text-lg md:text-xl text-white truncate">
              {currentTrack ? currentTrack.title : <span />}
            </h2>
            <h3 className="text-sm text-gray-100 truncate">
              <span className="text-gray-200">@</span>
              <span
                className="hover:text-sky-300 hover:font-semibold cursor-pointer"
                onClick={handleUsernameClick}
              >
                {username}
              </span>
            </h3>
          </div>
        </div>
        {children}
      </>
    </TrackPlayerContext.Provider>
  )
}

export default TrackPlayer

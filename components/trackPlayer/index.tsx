import { useRef, useEffect, useState } from 'react'
import { MusicNoteIcon, ChevronDownIcon } from '@heroicons/react/solid'

import PlayPause from '@components/trackPlayer/PlayPause'
import { TrackPlayerContext } from '@lib/contexts/TrackPlayerContext'
import { downloadAudioAsUrl } from '@lib/downloadAudio'
import { supabase } from '@lib/supabase'
import { useRouter } from 'next/router'
import { Icon } from '@components/icon'
import { ITrack } from '@lib/types/track'

const TrackPlayer: React.FC = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [displayPlayer, setDisplayPlayer] = useState<boolean>(false)

  const router = useRouter()

  const audioPlayer = useRef()
  const progressBar = useRef()

  useEffect(() => {
    ;(async () => {
      if (!currentTrack) return
      const url = await downloadAudioAsUrl(currentTrack.audio_url)
      setAudioUrl(url)
      if (!displayPlayer) setDisplayPlayer(true)

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
          className={`flex flex-row items-center justify-center w-max max-w-6xl p-2 rounded-full absolute z-10 bottom-5 left-5 md:bottom-20 md:p-4 md:left-20 bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500 shadow-md hover:shadow-lg transition ${
            !displayPlayer && 'hidden'
          }`}
        >
          <div className="absolute -right-6 bottom-0  md:-left-6">
            <Icon
              icon={<ChevronDownIcon />}
              size="sm"
              color="white"
              onClick={() => setDisplayPlayer(false)}
            />
          </div>
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
        {!displayPlayer && currentTrack && (
          <div
            className="flex flex-row items-center justify-center transition cursor-pointer hover:scale-105 hover:opacity-70 hover:bg-opacity-40 p-4 rounded-full absolute z-10 bottom-5 left-5 opacity-60 bg-white bg-opacity-30"
            onClick={() => setDisplayPlayer(true)}
          >
            <Icon
              icon={<MusicNoteIcon />}
              size="md"
              color="white"
              onClick={null}
            />
          </div>
        )}
        {children}
      </>
    </TrackPlayerContext.Provider>
  )
}

export default TrackPlayer

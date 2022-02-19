import { DownloadIcon } from '@heroicons/react/outline'

import FireTrack from '@components/track/FireTrack'
import { downloadTrack } from '@lib/downloadTrack'
import PlayPause from '@components/trackPlayer/PlayPause'
import { useAuth } from '@lib/hooks/useAuth'

const TrackIcons = () => {
  const { session } = useAuth()

  const handleDownload = () => {
    if (!session) {
      alert('must be logged in to download!')
      return
    }
    downloadTrack()
  }

  return (
    <div className="flex flex-col space-y-4 items-center">
      <FireTrack />
      <PlayPause />
      <DownloadIcon
        className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
        onClick={handleDownload}
      />
    </div>
  )
}

export default TrackIcons

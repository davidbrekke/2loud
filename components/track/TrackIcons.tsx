import { useContext } from 'react'
import { useRouter } from 'next/router'
import { DownloadIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/outline'

import { Icon } from '@components/icon'
import FireTrack from '@components/track/FireTrack'
import { downloadTrack } from '@lib/downloadTrack'
import { useAuth } from '@lib/hooks/useAuth'
import { deleteTrack } from '@lib/hooks/deleteTrack'
import { TrackContext } from '@lib/contexts/TrackContext'
import { GlobalTrackContext } from '@lib/contexts/GlobalTrackContext'

const TrackIcons = () => {
  const { session, user } = useAuth()
  const track = useContext(TrackContext)
  const {
    currentTrack,
    setCurrentTrack,
    isMuted,
    setIsMuted,
    setAudioPlayer,
    audioUrl,
    setAudioUrl,
  } = useContext(GlobalTrackContext)
  const router = useRouter()

  const handleDownload = () => {
    if (!session) {
      alert('must be logged in to download!')
      return
    }
    downloadTrack()
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this track?')) return

    const deletedTrackData = await deleteTrack(track.id)
    console.log('deletedTrackData', deletedTrackData)
    deletedTrackData && router.reload()
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col space-y-10 items-center">
        <FireTrack />
        <Icon
          icon={<DownloadIcon />}
          onClick={handleDownload}
          size="md"
          color="white"
        />
      </div>
      {user?.id === track.artist_id && (
        <>
          <div className="border border-gray-50 border-opacity-30 h-28 mx-2 md:mx-6" />
          <div className="flex flex-col space-y-10 items-center">
            <Icon
              icon={<PencilAltIcon />}
              onClick={() => router.push(`/tracks/edit/${track.id}`)}
              size="md"
              color="white"
            />
            <Icon
              icon={<TrashIcon />}
              onClick={handleDelete}
              size="md"
              color="white"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TrackIcons

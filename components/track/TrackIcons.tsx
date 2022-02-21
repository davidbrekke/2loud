import { useContext } from 'react'
import { useRouter } from 'next/router'
import { DownloadIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/outline'

import { Icon } from '@components/icon'
import FireTrack from '@components/track/FireTrack'
import { downloadTrack } from '@lib/downloadTrack'
import PlayPause from '@components/trackPlayer/PlayPause'
import { useAuth } from '@lib/hooks/useAuth'
import { useDeleteTrack } from '@lib/hooks/useDeleteTrack'
import { TrackContext } from '@lib/contexts/TrackContext'

const TrackIcons = () => {
  const { session, user } = useAuth()
  const { id, artist_id } = useContext(TrackContext)
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

    const deletedTrackData = await useDeleteTrack(id)
    console.log('deletedTrackData', deletedTrackData)
    deletedTrackData && router.reload()
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col space-y-4 items-center">
        <FireTrack />
        <PlayPause />
        <DownloadIcon
          className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
          onClick={handleDownload}
        />
      </div>
      {user?.id === artist_id && (
        <div className="flex flex-col space-y-6 items-center ml-4">
          <Icon
            icon={<PencilAltIcon />}
            onClick={() => router.push(`/tracks/edit/${id}`)}
            size="sm"
          />
          <Icon icon={<TrashIcon />} onClick={handleDelete} size="sm" />
        </div>
      )}
    </div>
  )
}

export default TrackIcons

import Track from '@components/track'
import { useTracks } from '@lib/hooks/useTracks'

const TrackList: React.FC = () => {
  const { data: tracks, isLoading, isError, error } = useTracks()

  if (isLoading) return <p className="h-screen flex items-center">Loading...</p>

  if (isError) return <p className="h-screen flex items-center">{error}</p>

  return (
    <div className="flex flex-col items-center w-screen space-y-6 pt-24 py-28">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  )
}

export default TrackList

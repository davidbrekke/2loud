import Track from '@components/track'
import { useTracks } from '@lib/hooks/useTracks'

const TrackList = () => {
  const tracks = useTracks()

  return (
    <div className="flex flex-col items-center w-screen space-y-6 overflow-scroll pt-24 py-32">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  )
}

export default TrackList

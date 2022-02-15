import Track from '@components/track'

const TrackList = ({ tracks }) => (
  <div className="flex flex-col items-center w-screen space-y-6 overflow-scroll py-24">
    {tracks.map((track) => (
      <Track key={track.id} track={track} />
    ))}
  </div>
)

export default TrackList

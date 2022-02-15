import Track from '@components/Track'

const TrackList = ({ tracks }) => (
  <div className="flex flex-col items-center w-full space-y-6 overflow-scroll py-24">
    {tracks.map((track) => (
      <Track key={track.id} track={track} />
    ))}
  </div>
)

export default TrackList

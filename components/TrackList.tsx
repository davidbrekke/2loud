import Track from '@components/Track'

const TrackList = ({ tracks }) => (
  <div className="flex flex-col space-y-6 scroll">
    {tracks.map((track) => (
      <Track key={track.id} track={track} />
    ))}
  </div>
)

export default TrackList

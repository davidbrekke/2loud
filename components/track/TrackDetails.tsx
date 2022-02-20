const TrackDetails = ({ track }) => (
  <div className="flex flex-col space-y-2 w-36 md:w-72">
    <h2 className="text-xl font-bold text-gray-700">{track.title}</h2>
    <h3 className="text-lg text-gray-600">{track.artist_id}</h3>
  </div>
)

export default TrackDetails

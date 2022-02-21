import { useContext } from 'react'

import { TrackContext } from '@lib/contexts/TrackContext'

const TrackDetails = () => {
  const { title, artist_id } = useContext(TrackContext)

  return (
    <div className="flex flex-col space-y-2 w-36 md:w-72">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <h3 className="text-lg text-gray-600">{artist_id}</h3>
    </div>
  )
}

export default TrackDetails

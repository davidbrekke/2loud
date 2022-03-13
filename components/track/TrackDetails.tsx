import { useContext } from 'react'

import { TrackContext } from '@lib/contexts/TrackContext'
import { useRouter } from 'next/router'
import { useProfileById } from '@lib/hooks/useProfile'

const TrackDetails: React.FC = () => {
  const { title, artist_id } = useContext(TrackContext)

  const router = useRouter()

  const {
    data: profileData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useProfileById(artist_id)

  return (
    <div className="flex flex-col space-y-2 w-36 md:w-72">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <h3 className="text-lg text-gray-600">
        <span className="text-gray-500">@</span>
        {(isLoading && '') ||
          (isError && error) ||
          (isSuccess && (
            <span
              onClick={() => router.push(`/${profileData?.username}`)}
              className="hover:text-sky-500 hover:font-semibold"
            >
              {profileData?.username}
            </span>
          ))}
      </h3>
    </div>
  )
}

export default TrackDetails

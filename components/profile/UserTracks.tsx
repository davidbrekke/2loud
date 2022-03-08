import Link from 'next/link'

import { useTracksByUserId } from '@lib/hooks/useTracksByUserId'
import Track from '@components/track'
import { useAuth } from '@lib/hooks/useAuth'

const UserTracks = ({ profile }) => {
  const { user } = useAuth()

  const {
    data: tracks,
    isLoading,
    isError,
    error,
  } = useTracksByUserId(profile.id)

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>{error}</p>

  return (
    <>
      <div className="mt-10 flex flex-row items-center space-x-4">
        <h3 className="text-2xl text-gray-700">
          {user && user.id === profile.id
            ? 'your tracks'
            : `${profile.username}'s tracks`}
        </h3>
        {user && user.id === profile.id && (
          <div className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500">
            <Link href="/addtrack">add track</Link>
          </div>
        )}
      </div>
      <div className="pt-4 pb-28 flex flex-col space-y-4">
        {tracks.length > 0 ? (
          tracks.map((track) => <Track key={track.id} track={track} />)
        ) : (
          <div className="text-center">
            <h3 className="text-2xl text-gray-700">no tracks yet :(</h3>
            {user && user.id === profile.id && (
              <p className="text-gray-600">add a track to get started</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default UserTracks

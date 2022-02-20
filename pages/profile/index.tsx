import Link from 'next/link'
import TrackList from '@components/trackList'
import Layout from '@components/layout'
import { useAuth } from '@lib/hooks/useAuth'
import { useUserTracks } from '@lib/hooks/useUserTracks'

const Profile = () => {
  const { user } = useAuth()

  const tracks = useUserTracks()

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1>welcome</h1>
          <h2>{user?.email}</h2>
          <Link href="/addtrack">
            <span className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500">
              add track
            </span>
          </Link>
        </div>
        <TrackList tracks={tracks} />
      </div>
    </Layout>
  )
}

export default Profile

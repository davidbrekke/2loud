import Link from 'next/link'
import Track from '@components/track'
import Layout from '@components/layout'
import { useAuth } from '@lib/hooks/useAuth'
import { useUserTracks } from '@lib/hooks/useUserTracks'

const Profile = () => {
  const { user } = useAuth()

  const tracks = useUserTracks()

  return (
    <Layout>
      <div className="h-screen w-screen flex flex-col justify-start items-center overflow-scroll pt-32">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="texl-2xl md:text-3xl font-bold text-gray-600">
            hi 👋
          </h1>
          <h2 className=" text-2xl md:text-4xl font-bold text-gray-700 truncate">
            {user?.email}
          </h2>
        </div>
        <div className="mt-10 flex flex-row items-center space-x-4">
          <h3 className="text-2xl text-gray-700">your tracks</h3>
          <div className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-500 via-indigo-400 to-indigo-500">
            <Link href="/addtrack">add track</Link>
          </div>
        </div>
        <div className="p-4 flex flex-col space-y-4">
          {tracks.length > 0 ? (
            tracks.map((track) => <Track key={track.id} track={track} />)
          ) : (
            <div className="text-center">
              <h3 className="text-2xl text-gray-700">no tracks yet :(</h3>
              <p className="text-gray-600">add a track to get started</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Profile

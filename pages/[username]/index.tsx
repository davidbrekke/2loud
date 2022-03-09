import { useRouter } from 'next/router'

import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'
import { useProfileByUsername } from '@lib/hooks/useProfile'

const Profile = () => {
  const router = useRouter()

  const { username } = router.query

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useProfileByUsername(username)

  return (
    <Layout>
      <div className="w-screen flex flex-col items-center pt-32">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>{error}</div>
        ) : (
          <>
            <UserDetails profile={profile} />
            <UserTracks profile={profile} />
          </>
        )}
      </div>
    </Layout>
  )
}

export default Profile

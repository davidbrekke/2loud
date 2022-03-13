import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'
import { useProfileByUsername } from '@lib/hooks/useProfile'

const Profile: NextPage = () => {
  const router = useRouter()

  const { username } = router.query
  const usernameString = username as string

  const {
    data: profile,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useProfileByUsername(usernameString)

  return (
    <Layout>
      <div className="w-screen flex flex-col items-center pt-32">
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error}</div>}
        {isSuccess && (
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

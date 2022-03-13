import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { NextPage } from 'next'

import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'
import { useAuth } from '@lib/hooks/useAuth'
import { useProfileById } from '@lib/hooks/useProfile'

const Profile: NextPage = () => {
  const { user } = useAuth()

  const {
    data: profile,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useProfileById(user?.id)

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

export const getServerSideProps = withAuthRequired({
  redirectTo: '/signin',
})

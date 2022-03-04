import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'
import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import { checkUserRegistration } from '@lib/checkUserRegistration'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      if (profile) return
      if (!user) {
        router.push('/signin')
        return
      }
      const { registered, userProfile } = await checkUserRegistration(user)
      if (!registered) {
        const { data: insertData, error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user?.id,
              email: user?.email,
            },
          ])
        if (insertError) {
          console.error(insertError)
        }
        setProfile(insertData[0])
      }
      if (registered && userProfile) {
        console.log('registered', registered)
        console.log('userProfile', userProfile)
        setProfile(userProfile)
      }
    })()
  }, [])

  return (
    profile && (
      <Layout>
        <div className="w-screen flex flex-col items-center pt-32">
          <UserDetails profile={profile} />
          <UserTracks profile={profile} />
        </div>
      </Layout>
    )
  )
}

export default Profile

export const getServerSideProps = withAuthRequired({
  redirectTo: '/signin',
})

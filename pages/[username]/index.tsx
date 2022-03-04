import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'
import { supabase } from '@lib/supabase'
import toast from 'react-hot-toast'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  const { username } = router.query

  useEffect(() => {
    ;(async () => {
      if (!username) return
      const { data: profileData, error: usernameError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
      if (usernameError) {
        console.error(usernameError)
      }
      if (profileData[0]) {
        setProfile(profileData[0])
      } else {
        toast.error(`${username} not found`)
        router.push('/')
      }
    })()
  }, [username])

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

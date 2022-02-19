import Layout from '@components/layout'
import { useAuth } from '@lib/hooks/useAuth'
import { useRouter } from 'next/router'

const Profile = () => {
  const { session, user } = useAuth()
  const router = useRouter()

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center">
        <h1>{user?.id}</h1>
        <h2>{user?.email}</h2>
      </div>
    </Layout>
  )
}

export default Profile

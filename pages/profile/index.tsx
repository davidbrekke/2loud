import Layout from '@components/layout'
import { useAuth } from '@lib/hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>welcome</h1>
        <h2>{user?.email}</h2>
      </div>
    </Layout>
  )
}

export default Profile

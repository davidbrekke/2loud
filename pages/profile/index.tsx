import Layout from '@components/layout'
import UserTracks from '@components/profile/UserTracks'
import UserDetails from '@components/profile/UserDetails'

const Profile = () => {
  return (
    <Layout>
      <div className="w-screen flex flex-col items-center pt-32">
        <UserDetails />
        <UserTracks />
      </div>
    </Layout>
  )
}

export default Profile

import NoAvatar from './NoAvatar'
import { Avatar } from '@components/avatar'

const UserDetails = ({ profile }) => {
  return (
    <div className="flex flex-col space-y-4 transition md:flex-row md:space-y-0 md:space-x-4 items-center">
      {/* if user already have a avatar set, display it */}
      {profile.avatar_url ? <Avatar url={profile.avatar_url} /> : <NoAvatar />}
      <div className="flex flex-col items-center md:items-start">
        <h2 className=" text-2xl md:text-3xl transition font-bold text-gray-700 truncate">
          {profile.username || ''}
        </h2>
        <h2 className="text-md md:text-lg font-bold text-gray-600 truncate">
          {profile.email}
        </h2>
      </div>
    </div>
  )
}

export default UserDetails

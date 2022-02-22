import { useAuth } from '@lib/hooks/useAuth'

const UserDetails = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1 className="texl-2xl md:text-3xl font-bold text-gray-600">hi 👋</h1>
      <h2 className=" text-2xl md:text-4xl font-bold text-gray-700 truncate">
        {user?.email}
      </h2>
    </div>
  )
}

export default UserDetails

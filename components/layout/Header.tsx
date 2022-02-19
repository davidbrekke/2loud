import { useRouter } from 'next/router'
import Logo from '@components/layout/Logo'
import { useAuth } from '@lib/hooks/useAuth'

const Header = () => {
  const { session, signOut } = useAuth()
  const router = useRouter()
  return (
    <header className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Logo />
      {session && (
        <div className="flex flex-row items-center space-x-2">
          <div
            className="px-2 py-1 text-lg rounded text-white bg-white bg-opacity-20 shadow transition hover:shadow-xl cursor-pointer hover:bg-opacity-30"
            onClick={() => router.push('profile')}
          >
            profile
          </div>
          <button
            className="px-2 py-1 text-sm rounded text-white cursor-pointer transition hover:bg-opacity-20 hover:bg-white hovre:shadow-xl"
            onClick={signOut}
          >
            sign out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header

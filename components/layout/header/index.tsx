import Link from 'next/link'

import HeaderContainer from '@components/layout/header/HeaderContainer'
import Logo from '@components/layout/Logo'
import { useAuth } from '@lib/hooks/useAuth'

const Header: React.FC = () => {
  const { session, signOut } = useAuth()

  return (
    <HeaderContainer>
      <Logo />
      {session ? (
        <div className="flex flex-row items-center space-x-4">
          <Link href="/profile" passHref>
            <span className="px-2 py-1 text-lg rounded-lg text-white bg-white bg-opacity-10 shadow-lg transition hover:shadow-xl cursor-pointer hover:bg-opacity-20 hover:scale-105">
              profile
            </span>
          </Link>
          <button
            className="px-2 py-1 text-sm rounded-md text-white transition hover:shadow-xl cursor-pointer hover:bg-white hover:bg-opacity-10 hover:scale-105"
            onClick={signOut}
          >
            sign out
          </button>
        </div>
      ) : (
        <Link href="/signin" passHref>
          <span className="px-2 py-1 text-lg rounded-lg text-white bg-white bg-opacity-10 shadow-lg transition hover:shadow-xl cursor-pointer hover:bg-opacity-20 hover:scale-105">
            sign in
          </span>
        </Link>
      )}
    </HeaderContainer>
  )
}

export default Header

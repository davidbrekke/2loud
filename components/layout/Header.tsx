import Logo from '@components/layout/Logo'

const Header = () => (
  <header className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
    <Logo />
  </header>
)

export default Header

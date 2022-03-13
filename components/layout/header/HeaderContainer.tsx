const HeaderContainer: React.FC = ({ children }) => (
  <header className="absolute z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 w-screen py-4">
    <div className="flex flex-row items-center max-w-6xl justify-around m-auto">
      {children}
    </div>
  </header>
)

export default HeaderContainer

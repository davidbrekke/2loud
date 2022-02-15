import Header from '@components/layout/Header'
import AppContainer from '@components/layout/AppContainer'
import TrackPlayer from '@components/TrackPlayer'

const Layout = ({ children }) => {
  return (
    <AppContainer>
      <main className="max-w-6xl min-h-screen max-h-screen m-auto flex flex-col items-center justify-between relative">
        <Header />
        {children}
        <TrackPlayer />
      </main>
    </AppContainer>
  )
}

export default Layout

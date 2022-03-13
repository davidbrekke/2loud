import Head from 'next/head'
import Header from '@components/layout/header'
import AppContainer from '@components/layout/AppContainer'
import TrackPlayer from '@components/trackPlayer'

const Layout: React.FC = ({ children }) => (
  <>
    <Head>
      <title>2loud</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="2loud" />
    </Head>
    <AppContainer>
      <main className="max-w-6xl min-h-screen max-h-screen m-auto flex flex-col items-center">
        <TrackPlayer>
          <Header />
          {children}
        </TrackPlayer>
      </main>
    </AppContainer>
  </>
)

export default Layout

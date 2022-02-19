import { useAuth } from '@lib/hooks/useAuth'
import Layout from '@components/layout'
import TrackList from '@components/trackList'
import TrackPlayer from '@components/trackPlayer'
import { Auth } from '@components/auth'
import { tracks } from '@lib/data'

export default function App() {
  const { session } = useAuth()
  return (
    <Layout>
      {!session ? <Auth /> : <TrackList tracks={tracks} />}
      <TrackPlayer />
    </Layout>
  )
}

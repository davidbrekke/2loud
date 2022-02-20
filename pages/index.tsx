import Layout from '@components/layout'
import TrackList from '@components/trackList'
import TrackPlayer from '@components/trackPlayer'
import { useTracks } from '@lib/hooks/useTracks'

export default function App() {
  const tracks = useTracks()

  return (
    <Layout>
      <TrackList tracks={tracks} />
      <TrackPlayer />
    </Layout>
  )
}

import Layout from '@components/layout'
import TrackList from '@components/trackList'
import TrackPlayer from '@components/trackPlayer'
import { tracks } from '@lib/data'

export default function App() {
  return (
    <Layout>
      <TrackList tracks={tracks} />
      <TrackPlayer />
    </Layout>
  )
}

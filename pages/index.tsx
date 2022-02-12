import Image from 'next/image'

import Layout from '@components/layout'
import TrackList from '@components/TrackList'

const tracks = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    artwork: 'https://picsum.photos/200/200',
  },
  {
    id: '2',
    title: 'Track 2',
    artist: 'Artist 2',
    artwork: 'https://picsum.photos/200/200',
  },
  {
    id: '3',
    title: 'Track 3',
    artist: 'Artist 3',
    artwork: 'https://picsum.photos/200/200',
  },
]
export default function App() {
  return (
    <Layout>
      <TrackList tracks={tracks} />
    </Layout>
  )
}

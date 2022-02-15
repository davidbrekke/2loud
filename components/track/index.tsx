import TrackContainer from '@components/track/TrackContainer'
import TrackIcons from '@components/track/TrackIcons'
import CoverArt from '@components/track/CoverArt'
import TrackDetails from '@components/track/TrackDetails'

const Track = ({ track }) => {
  return (
    <TrackContainer>
      <CoverArt artwork={track.artwork} />
      <TrackDetails track={track} />
      <TrackIcons />
    </TrackContainer>
  )
}

export default Track

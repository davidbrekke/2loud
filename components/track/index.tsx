import TrackContainer from '@components/track/TrackContainer'
import TrackIcons from '@components/track/TrackIcons'
import CoverArt from '@components/track/CoverArt'
import TrackDetails from '@components/track/TrackDetails'
import { TrackContext } from '@lib/contexts/TrackContext'

const Track = ({ track }) => {
  return (
    <TrackContext.Provider value={track}>
      <TrackContainer>
        <CoverArt />
        <TrackDetails />
        <TrackIcons />
      </TrackContainer>
    </TrackContext.Provider>
  )
}

export default Track

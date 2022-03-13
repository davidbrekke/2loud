import TrackContainer from '@components/track/TrackContainer'
import TrackIcons from '@components/track/TrackIcons'
import CoverArt from '@components/track/CoverArt'
import TrackDetails from '@components/track/TrackDetails'
import { TrackContext } from '@lib/contexts/TrackContext'
import { ITrack } from '@lib/types/track'

interface TrackProps {
  track: ITrack
}

const Track: React.FC<TrackProps> = ({ track }) => (
  <TrackContext.Provider value={track}>
    <TrackContainer>
      <CoverArt />
      <TrackDetails />
      <TrackIcons />
    </TrackContainer>
  </TrackContext.Provider>
)

export default Track

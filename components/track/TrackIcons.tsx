import { DownloadIcon } from '@heroicons/react/outline'

import FireTrack from '@components/track/FireTrack'
import { downloadTrack } from '@lib/downloadTrack'
import PlayPause from '@components/trackPlayer/PlayPause'

const TrackIcons = () => (
  <div className="flex flex-col space-y-4 items-center">
    <FireTrack />
    <PlayPause />
    <DownloadIcon
      className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110"
      onClick={downloadTrack}
    />
  </div>
)

export default TrackIcons

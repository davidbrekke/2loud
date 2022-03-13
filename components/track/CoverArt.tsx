import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { MusicNoteIcon } from '@heroicons/react/solid'

import { TrackContext } from '@lib/contexts/TrackContext'
import { downloadArtworkAsUrl } from '@lib/downloadArtwork'

const CoverArt: React.FC = () => {
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null)

  const { artwork_url } = useContext(TrackContext)

  useEffect(() => {
    ;(async () => {
      if (artwork_url) {
        const url = await downloadArtworkAsUrl(artwork_url)
        setCoverArtUrl(url)
      }
    })()
  }, [artwork_url])

  return coverArtUrl ? (
    <div className="w-24">
      <Image
        src={coverArtUrl}
        width={100}
        height={100}
        className="rounded-2xl"
        alt="cover art"
      />
    </div>
  ) : (
    <div className="w-24 flex flex-row items-center justify-center">
      <MusicNoteIcon className="text-white w-16 drop-shadow-xl" />
    </div>
  )
}

export default CoverArt

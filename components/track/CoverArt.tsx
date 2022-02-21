import { useContext } from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@lib/supabase'
import { TrackContext } from '@lib/contexts/TrackContext'

const CoverArt = () => {
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null)

  const { artwork_url } = useContext(TrackContext)

  useEffect(() => {
    if (artwork_url) downloadArtwork(artwork_url)
  }, [artwork_url])

  const downloadArtwork = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('artwork')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setCoverArtUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }
  return coverArtUrl ? (
    <div className="w-24 md:w-32">
      <Image
        src={coverArtUrl}
        width={200}
        height={200}
        className="rounded-2xl"
      />
    </div>
  ) : (
    <div className="w-24 md:w-32">
      <span>artwork</span>
    </div>
  )
}

export default CoverArt

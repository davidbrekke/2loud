import { useState, useEffect } from 'react'

import { supabase } from '@lib/supabase'

const useTracks = () => {
  const [tracks, setTracks] = useState([])

  const fetchTracks = async () => {
    try {
      let { data: tracksData, error: tracksError } = await supabase
        .from('tracks')
        .select('*')

      if (tracksError) {
        throw tracksError
      }
      setTracks(tracksData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  return tracks
}

export { useTracks }

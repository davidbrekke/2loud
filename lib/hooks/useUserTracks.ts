import { useState, useEffect } from 'react'

import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'

const useUserTracks = () => {
  const { user } = useAuth()
  const [tracks, setTracks] = useState([])

  const fetchUserTracks = async () => {
    try {
      let { data: tracksData, error: tracksError } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', user.id)

      if (tracksError) {
        throw tracksError
      }
      setTracks(tracksData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserTracks()
  }, [user])

  return tracks
}

export { useUserTracks }

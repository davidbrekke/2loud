import { useQuery } from 'react-query'

import { supabase } from '@lib/supabase'
import { Track } from '@lib/types/track'

const useTracksByUserId = (id: string) => {
  const fetchTracksByUserId = async (id: string): Promise<Track[]> => {
    try {
      let { data: tracksData, error: tracksError } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', id)

      if (tracksError) {
        throw tracksError
      }
      return tracksData
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery(['tracks', id], () => fetchTracksByUserId(id))
}

export { useTracksByUserId }

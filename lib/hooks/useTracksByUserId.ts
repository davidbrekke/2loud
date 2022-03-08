import { useQuery } from 'react-query'

import { supabase } from '@lib/supabase'

const useTracksByUserId = (id: string) => {
  const fetchTracksByUserId = async (id: string) => {
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

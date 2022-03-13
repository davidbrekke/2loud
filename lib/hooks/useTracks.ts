import { useQuery } from 'react-query'
import { supabase } from '@lib/supabase'
import { ITrack } from '@lib/types/track'

const useTracks = () => {
  const fetchTracks = async (): Promise<ITrack[]> => {
    try {
      const { data: tracksData, error: tracksError } = await supabase
        .from('tracks')
        .select('*')

      if (tracksError) {
        console.error(tracksError)
        throw tracksError
      }
      return tracksData
    } catch (error) {
      console.error(error)
    }
  }

  return useQuery(['tracks'], fetchTracks)
}

export { useTracks }

import { supabase } from '@lib/supabase'
import { ITrack } from '@lib/types/track'

const getTrack = async (id: string): Promise<ITrack[]> => {
  try {
    let { data: trackData, error: trackError } = await supabase
      .from('tracks')
      .select('*')
      .eq('id', id)

    if (trackError) {
      throw trackError
    }
    return trackData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getTrack }

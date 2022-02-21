import { supabase } from '@lib/supabase'

const useTrack = async (id: string) => {
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
  }
}

export { useTrack }

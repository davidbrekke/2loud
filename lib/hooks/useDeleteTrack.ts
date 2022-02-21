import { supabase } from '@lib/supabase'

const useDeleteTrack = async (id) => {
  try {
    let { data: deletedTrackData, error: deletionError } = await supabase
      .from('tracks')
      .delete()
      .match({ id })

    if (deletionError) {
      throw deletionError
    }
    return deletedTrackData
  } catch (error) {
    console.error(error)
  }
}

export { useDeleteTrack }

import { supabase } from '@lib/supabase'
import { useMutation, useQueryClient } from 'react-query'
import { ITrack } from '@lib/types/track'

const useDeleteTrack = () => {
  const queryClient = useQueryClient()

  const deleteTrack = async (track: ITrack): Promise<ITrack[]> => {
    try {
      if (confirm('Are you sure you want to delete this track?')) {
        // delete track record from tracks table
        const { data: deletedTrackData, error: deletionError } = await supabase
          .from('tracks')
          .delete()
          .match({ id: track.id })
        if (deletionError) throw deletionError

        // delete track artwork from artwork storage
        const { error: artworkDeletionError } = await supabase.storage
          .from('artwork')
          .remove([track.artwork_url])
        if (artworkDeletionError) throw artworkDeletionError

        // delete track audio from audio storage
        const { error: audioDeletionError } = await supabase.storage
          .from('audio')
          .remove([track.audio_url])
        if (audioDeletionError) throw audioDeletionError

        // return deleted track
        return deletedTrackData
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return useMutation(deleteTrack, {
    onSuccess: () => {
      // invalidate cache with key including 'tracks' on success
      queryClient.invalidateQueries(['tracks'])
    },
  })
}

export { useDeleteTrack }

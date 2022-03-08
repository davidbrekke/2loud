import { supabase } from '@lib/supabase'
import { useMutation, useQueryClient } from 'react-query'

const useDeleteTrack = () => {
  const queryClient = useQueryClient()

  const deleteTrack = async (track) => {
    try {
      // delete track record from tracks table
      let { data: deletedTrackData, error: deletionError } = await supabase
        .from('tracks')
        .delete()
        .match({ id: track.id })

      if (deletionError) {
        console.error(deletionError)
        throw deletionError
      }

      // delete track artwork from artwork storage
      const { data: deletedArtworkTrackData, error: artworkDeletionError } =
        await supabase.storage.from('artwork').remove([track.artwork_url])

      if (artworkDeletionError) {
        console.error(artworkDeletionError)
        throw artworkDeletionError
      }

      // delete track audio from audio storage
      const { data: deletedAudioTrackData, error: audioDeletionError } =
        await supabase.storage.from('audio').remove([track.audio_url])

      if (audioDeletionError) {
        console.error(audioDeletionError)
        throw audioDeletionError
      }
      return deletedTrackData
    } catch (error) {
      console.error(error)
    }
  }

  return useMutation(deleteTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries('tracks')
    },
  })
}

export { useDeleteTrack }

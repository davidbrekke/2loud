import { supabase } from '@lib/supabase'

const deleteTrack = async (track) => {
  try {
    // delete track record from tracks table
    let { data: deletedTrackData, error: deletionError } = await supabase
      .from('tracks')
      .delete()
      .match({ id: track.id })

    if (deletionError) {
      console.error(deletionError)
      return false
    }

    // delete track artwork from artwork storage
    const { data: deletedArtworkTrackData, error: artworkDeletionError } =
      await supabase.storage.from('artwork').remove([track.artwork_url])

    if (artworkDeletionError) {
      console.error(artworkDeletionError)
      return false
    }

    // delete track audio from audio storage
    const { data: deletedAudioTrackData, error: audioDeletionError } =
      await supabase.storage.from('audio').remove([track.audio_url])

    if (audioDeletionError) {
      console.error(audioDeletionError)
      return false
    }
    return true
  } catch (error) {
    console.error(error)
  }
}

export { deleteTrack }

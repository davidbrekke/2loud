import { supabase } from '@lib/supabase'

/**
 * function to download audio from supabase as a local url
 * @param    { string } path    path to the audio in supabase
 * @return   { URL }            url to the audio
 */
const downloadAudioAsUrl = async (path: string) => {
  try {
    const { data, error } = await supabase.storage.from('audio').download(path)
    if (error) {
      throw error
    }
    return URL.createObjectURL(data)
  } catch (error) {
    console.log('Error downloading audio: ', error.message)
  }
}

export { downloadAudioAsUrl }

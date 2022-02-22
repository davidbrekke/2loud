import { supabase } from '@lib/supabase'

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

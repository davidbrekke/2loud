import { supabase } from '@lib/supabase'

const downloadArtworkAsUrl = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('artwork')
      .download(path)
    if (error) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    console.log('Error downloading artwork: ', error.message)
  }
}

export { downloadArtworkAsUrl }

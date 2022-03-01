import { supabase } from '@lib/supabase'

/**
 * function to download artwork from supabase as a local url
 * @param    { string } path    path to the artwork in supabase
 * @return   { URL }            url to the artwork
 */
const downloadArtworkAsUrl = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('artwork')
      .download(path)
    if (error) {
      throw error
    }
    return URL.createObjectURL(data)
  } catch (error) {
    console.log('Error downloading artwork: ', error.message)
  }
}

export { downloadArtworkAsUrl }

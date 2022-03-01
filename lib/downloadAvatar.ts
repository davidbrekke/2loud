import { supabase } from '@lib/supabase'

/**
 * function to download avatar from supabase as a local url
 * @param    { string } path    path to the avatar in supabase
 * @return   { URL }            url to the avatar
 */
const downloadAvatarAsUrl = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path)
    if (error) {
      throw error
    }
    return URL.createObjectURL(data)
  } catch (error) {
    console.log('Error downloading avatar: ', error.message)
  }
}

export { downloadAvatarAsUrl }

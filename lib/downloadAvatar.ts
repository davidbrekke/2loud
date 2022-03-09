import { supabase } from '@lib/supabase'

const downloadAvatarAsUrl = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path)
    if (error) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    console.log('Error downloading avatar: ', error.message)
  }
}

export { downloadAvatarAsUrl }

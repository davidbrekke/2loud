import { supabase } from '@lib/supabase'
const downloadTrack = async (audioUrl: string) => {
  try {
    if (confirm('Download track?')) {
      const { data, error } = await supabase.storage
        .from('audio')
        .download(audioUrl)
      if (error) {
        console.error(error)
      }
      const anchor = document.createElement('a')
      const localUrl = URL.createObjectURL(data)
      anchor.href = localUrl
      anchor.download = audioUrl
      anchor.click()
    }
  } catch (e) {
    console.error(e)
  }
}

export { downloadTrack }

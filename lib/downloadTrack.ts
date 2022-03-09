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
      // create anchor tag
      const anchor = document.createElement('a')
      const localUrl = URL.createObjectURL(data)
      // set anchor href to local url
      anchor.href = localUrl
      // set anchor download to filename
      anchor.download = audioUrl
      // invoke click to trigger download
      anchor.click()
    }
  } catch (e) {
    console.error(e)
  }
}

export { downloadTrack }

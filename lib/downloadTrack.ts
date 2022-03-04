import { supabase } from '@lib/supabase'
const downloadTrack = async (audioUrl: string) => {
  if (confirm('Download track?')) {
    console.log('Download track', audioUrl)
    const { data, error } = await supabase.storage
      .from('audio')
      .download(audioUrl)
    if (error) {
      console.error(error)
    }
    console.log('Downloaded track', data)
    const anchor = document.createElement('a')
    const localUrl = URL.createObjectURL(data)
    anchor.href = localUrl
    anchor.download = audioUrl
    anchor.click()
  }
}

export { downloadTrack }

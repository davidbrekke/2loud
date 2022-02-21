import { createContext } from 'react'

export const TrackContext = createContext({
  id: '',
  title: '',
  artwork_url: '',
  audio_url: '',
  artist_id: '',
  created_at: '',
  updated_at: '',
})

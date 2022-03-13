interface ITrack {
  id: string
  title: string
  artwork_url: string | null
  audio_url: string
  artist_id: string
  created_at: string
  updated_at: string | null
}

export type { ITrack }

interface Track {
  id: string
  title: string
  artwork_url: string | null
  audio_url: string
  artist_id: string
  created_at: Date
  updated_at: Date | null
}

export type { Track }

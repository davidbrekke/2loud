interface Profile {
  id: string
  username: string | null
  email: string
  avatarUrl: string | null
  created_at: Date
  updated_at: Date | null
}

export type { Profile }

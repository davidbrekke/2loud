interface Profile {
  id: string
  username: string | null
  email: string
  avatarUrl: string | null
  created_at: string
  updated_at: string | null
}

export type { Profile }

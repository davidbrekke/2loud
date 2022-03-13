interface IProfile {
  id: string
  username: string | null
  email: string
  avatar_url: string | null
  created_at: string
  updated_at: string | null
}

export type { IProfile }

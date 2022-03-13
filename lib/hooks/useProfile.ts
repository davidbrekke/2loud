import { supabase } from '@lib/supabase'
import { useQuery } from 'react-query'
import { IProfile } from '@lib/types/profile'

// GET PROFILE BY USERNAME
const useProfileByUsername = (username: string) => {
  const fetchProfileByUsername = async (
    username: string
  ): Promise<IProfile> => {
    if (!username) return
    const { data: profileData, error: usernameError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
    if (usernameError) {
      console.error(usernameError)
    }
    return profileData[0]
  }

  return useQuery(['profile', username], () => fetchProfileByUsername(username))
}

// GET PROFILE BY ID
const useProfileById = (id: string) => {
  const fetchProfileById = async (id: string): Promise<IProfile> => {
    if (!id) return
    const { data: profileData, error: usernameError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
    if (usernameError) {
      console.error(usernameError)
    }
    return profileData[0]
  }

  return useQuery(['profile', id], () => fetchProfileById(id))
}

export { useProfileByUsername, useProfileById }

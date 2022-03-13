import { supabase } from '@lib/supabase'
import { IProfile } from '@lib/types/profile'

const checkUserRegistration = async (email: string): Promise<IProfile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
    if (error) {
      console.log(error)
    }
    // return null if no profile found
    if (!data.length) return null
    // return profile if found
    if (data.length) return data[0]
  } catch (error) {
    console.log(error)
  }
}

export { checkUserRegistration }

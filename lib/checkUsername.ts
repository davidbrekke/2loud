import { supabase } from '@lib/supabase'

const checkUsername = async (username: string): Promise<boolean> => {
  try {
    let { data: usernameData, error: usernameError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)

    if (usernameError) {
      throw usernameError
    }
    // return true if username is found, false if not
    return usernameData.length ? true : false
  } catch (error) {
    console.error(error)
  }
}

export { checkUsername }

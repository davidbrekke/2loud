import { supabase } from '@lib/supabase'

const checkUserRegistration = async (user) => {
  try {
    const { id } = user
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
    if (error) {
      console.log(error)
    }
    if (!data) {
      return {
        registered: false,
        userProfile: null,
      }
    }
    return {
      registered: true,
      userProfile: data[0],
    }
  } catch (error) {
    console.log(error)
  }
}

export { checkUserRegistration }

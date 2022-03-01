import { useState, useEffect } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supabase } from '@lib/supabase'
import { useRouter } from 'next/router'

const useAuth = () => {
  const [session, setSession] = useState<AuthSession | null>(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.log('Error thrown:', error.message)
      alert(error.error_description || error.message)
    }
  }

  const user = supabase.auth.user()

  return { session, signOut, user }
}

export { useAuth }

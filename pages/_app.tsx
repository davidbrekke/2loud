import type { AppProps } from 'next/app'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { Toaster } from 'react-hot-toast'
import 'tailwindcss/tailwind.css'

export default function _App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  )
}

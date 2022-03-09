import type { AppProps } from 'next/app'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'

export default function _App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

const queryClient = new QueryClient()

const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider supabaseClient={supabaseClient}>
      {children}
      <Toaster />
    </UserProvider>
  </QueryClientProvider>
)

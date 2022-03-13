import { AppProps } from 'next/app'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'

const _App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
)

const queryClient = new QueryClient()

const Providers: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider supabaseClient={supabaseClient}>
      {children}
      <Toaster />
    </UserProvider>
  </QueryClientProvider>
)

export default _App

import { SetStateAction, useState } from 'react'

import { supabase } from '@lib/supabase'

interface UseMagicLinkReturn {
  loading: boolean
  sentTo: string
  emailSent: boolean
  email: string
  handleSendAgain: () => void
  handleEmailChange: (e: { target: { value: SetStateAction<string> } }) => void
  handleSendMagicLink: (e: { preventDefault: () => void }) => void
}

const useMagicLink = (): UseMagicLinkReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [sentTo, setSentTo] = useState<string>('')
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const sendMagicLink = async (email: string): Promise<void> => {
    try {
      setLoading(true)
      setSentTo(email)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
    } catch (error) {
      console.log('Error thrown:', error.message)
    } finally {
      setLoading(false)
      setEmail('')
    }
  }

  const handleSendAgain = (): void => setEmailSent(false)

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }): void => setEmail(e.target.value)

  const handleSendMagicLink = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    sendMagicLink(email)
    setEmailSent(true)
  }

  return {
    loading,
    sentTo,
    emailSent,
    email,
    handleSendAgain,
    handleEmailChange,
    handleSendMagicLink,
  }
}

export default useMagicLink

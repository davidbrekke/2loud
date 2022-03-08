import { SetStateAction, useState } from 'react'

import { supabase } from '@lib/supabase'

const useMagicLink = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [sentTo, setSentTo] = useState<string>('')
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const sendMagicLink = async (email: string) => {
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

  const handleSendAgain = () => setEmailSent(false)

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setEmail(e.target.value)

  const handleSendMagicLink = (e: { preventDefault: () => void }) => {
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

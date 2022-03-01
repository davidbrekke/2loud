import { useState } from 'react'
import { supabase } from '@lib/supabase'

// TODO: add 'sent to' when emailSent is true

const Auth = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const sendMagicLink = async (email: string) => {
    try {
      setLoading(true)
      const { error, user } = await supabase.auth.signIn({ email })
      if (error) throw error
    } catch (error) {
      console.log('Error thrown:', error.message)
    } finally {
      setLoading(false)
      setEmail('')
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4 text-gray-600">
      {emailSent ? (
        <div className="flex flex-col items-center justify center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            🎉 check email for login link 🎉
          </h1>
          <div
            className="text-md text-gray-600 cursor-pointer"
            onClick={() => setEmailSent(false)}
          >
            send again
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            enter email to receive login link
          </h1>
          <div className="flex flex-col text-gray-500">
            <label htmlFor="email" className="pl-2">
              email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none p-2 rounded-lg "
              placeholder="email"
            />
          </div>
          <button
            className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-400 via-indigo-400 to-indigo-500"
            onClick={(e) => {
              e.preventDefault()
              sendMagicLink(email)
              setEmailSent(true)
            }}
            disabled={loading}
          >
            {loading ? <span>sending...</span> : <span>Send magic link</span>}
          </button>
        </>
      )}
    </div>
  )
}

export { Auth }

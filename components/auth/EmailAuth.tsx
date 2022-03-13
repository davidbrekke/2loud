import useMagicLink from '@lib/hooks/useMagicLink'

const EmailAuth: React.FC = () => {
  const {
    loading,
    sentTo,
    emailSent,
    email,
    handleSendAgain,
    handleEmailChange,
    handleSendMagicLink,
  } = useMagicLink()

  return (
    <>
      {emailSent ? (
        <div className="flex flex-col items-center justify center gap-2 p-2">
          <h2 className="text-md text-gray-700 font-bold">sent to {sentTo}</h2>
          <h1 className="text-2xl md:text-3xl font-bold">
            🎉 check email for login link 🎉
          </h1>
          <div
            className="text-md text-gray-600 cursor-pointer transition hover:font-bold"
            onClick={handleSendAgain}
          >
            send again
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-2">
          <h1 className="text-2xl font-bold text-center">
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
              onChange={handleEmailChange}
              className="outline-none p-2 rounded-lg "
              placeholder="email"
            />
          </div>
          <button
            className="px-4 py-2 rounded-lg text-gray-100 shadow-lg transition text-lg hover:scale-105 hover:shadow-xl cursor-pointer bg-gradient-to-br from-teal-400 via-indigo-400 to-indigo-500"
            onClick={handleSendMagicLink}
            disabled={loading}
          >
            {loading ? <span>sending...</span> : <span>Send magic link</span>}
          </button>
        </div>
      )}
    </>
  )
}

export default EmailAuth

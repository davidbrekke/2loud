import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import { supabase } from '@lib/supabase'
import { checkUsername } from '@lib/checkUsername'
import { IProfile } from '@lib/types/profile'

interface UsernameProps {
  profile: IProfile
}

const Username: React.FC<UsernameProps> = ({ profile }) => {
  const [newUsername, setNewUsername] = useState<string>(
    profile?.username || ''
  )
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleUsernameChange = async () => {
    if (loading) return
    if (newUsername === profile?.username) {
      toast.error('username must be different to change')
      return
    }
    if (newUsername === '') {
      toast.error('pls enter a username!')
      return
    }
    setLoading(true)
    // check if username is available
    const isUsernameTaken = await checkUsername(newUsername)
    if (isUsernameTaken) {
      toast.error('username taken')
      setLoading(false)
      return
    }
    // if available, set as username
    toast.success('username available')
    const { error: usernameUpdateError } = await supabase
      .from('profiles')
      .upsert({
        id: profile?.id,
        username: newUsername,
      })
    if (usernameUpdateError) {
      toast.error('error updating username')
      setLoading(false)
      return
    }
    setLoading(false)
    router.reload()
  }

  return profile?.username ? (
    // if user already have a username set, display it
    <div className="flex flex-row items-center space-x-4">
      {isEditing ? (
        // if user is editing, display input
        <>
          <input
            className="text-lg md:text-xl py-1 pl-2 rounded border border-gray-500 transition font-bold text-gray-700 truncate outline-none bg-transparent placeholder:text-gray-500 placeholder:font-normal focus:shadow"
            value={newUsername}
            placeholder="username..."
            onChange={(evt) => setNewUsername(evt.target.value)}
          />
          <div className="flex flex-col items-center space-y-1">
            <div
              className="text-gray-500 text-lg py-1/2 px-2 rounded hover:shadow-xl transition cursor-pointer hover:bg-white hover:bg-opacity-30"
              onClick={handleUsernameChange}
            >
              save
            </div>
            <div
              className="text-xs cursor-pointer text-gray-500 hover:text-gray-600"
              onClick={() => setIsEditing(false)}
            >
              cancel
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl transition font-bold text-gray-700 truncate">
            {profile?.username}
          </h2>
          <div
            className="text-gray-500 text-lg py-1/2 px-2 rounded hover:shadow-xl transition cursor-pointer hover:bg-white hover:bg-opacity-30"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            edit
          </div>
        </>
      )}
    </div>
  ) : (
    // if user doesn't have a username, display a input field to set it
    <div className="flex flex-row items-center space-x-4">
      <input
        className="text-lg md:text-xl py-1 pl-2 rounded border border-white transition font-bold text-gray-700 truncate outline-none bg-transparent placeholder:text-gray-500 placeholder:font-normal focus:shadow-lg"
        value={newUsername}
        onChange={(evt) => setNewUsername(evt.target.value)}
        placeholder="set username..."
      />
      {newUsername && (
        <div
          className="text-gray-500 text-lg py-1/2 px-2 rounded hover:shadow-xl transition cursor-pointer hover:bg-white hover:bg-opacity-30"
          onClick={handleUsernameChange}
        >
          save
        </div>
      )}
    </div>
  )
}

export default Username

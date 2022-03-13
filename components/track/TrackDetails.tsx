import { useContext, useState, useEffect } from 'react'

import { supabase } from '@lib/supabase'
import { TrackContext } from '@lib/contexts/TrackContext'
import { useRouter } from 'next/router'

const TrackDetails: React.FC = () => {
  const [username, setUsername] = useState<string>('')

  const { title, artist_id } = useContext(TrackContext)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', artist_id)
      if (usernameError) {
        console.error(usernameError)
        return
      }
      setUsername(usernameData[0].username)
    })()
  }, [])

  const handleUsernameClick = () => router.push(`/${username}`)

  return (
    <div className="flex flex-col space-y-2 w-36 md:w-72">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <h3 className="text-lg text-gray-600">
        <span className="text-gray-500">@</span>
        <span
          onClick={handleUsernameClick}
          className="hover:text-sky-500 hover:font-semibold"
        >
          {username}
        </span>
      </h3>
    </div>
  )
}

export default TrackDetails

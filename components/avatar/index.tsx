import { UserCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { downloadAvatarAsUrl } from '@lib/downloadAvatar'
import { useEffect, useState } from 'react'

const Avatar = ({ url }: { url: string }) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    ;(async () => {
      const localUrl = await downloadAvatarAsUrl(url)
      console.log(localUrl)
      setAvatarUrl(localUrl)
    })()
  }, [])

  // check if url is valid
  if (typeof url !== 'string') {
    return <span>invalid url</span>
  }

  return (
    <div
      className={`flex flex-row items-center justify-center overflow-hidden rounded-lg w-24 h-24 shadow-xl`}
    >
      {avatarUrl ? (
        <Image src={avatarUrl} alt="avatar" width={100} height={100} />
      ) : (
        <UserCircleIcon className="text-white w-16 drop-shadow-xl" />
      )}
    </div>
  )
}

export { Avatar }

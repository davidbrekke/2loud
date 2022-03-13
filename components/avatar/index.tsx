import { UserCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { downloadAvatarAsUrl } from '@lib/downloadAvatar'
import { useEffect, useState } from 'react'

interface AvatarProps {
  url: string
}

const Avatar: React.FC<AvatarProps> = ({ url }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const localUrl = await downloadAvatarAsUrl(url)
      setAvatarUrl(localUrl)
    })()
  }, [])

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

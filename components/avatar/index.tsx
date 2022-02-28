import { downloadAvatarAsUrl } from '@lib/downloadAvatar'
import { useEffect, useState } from 'react'

const Avatar = ({ url, size }: { url: string; size: 'sm' | 'md' | 'lg' }) => {
  // check if url is valid
  if (typeof url !== 'string') {
    return <span>invalid url</span>
  }
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    ;(async () => {
      const localUrl = await downloadAvatarAsUrl(url)
      console.log(localUrl)
      setAvatarUrl(localUrl)
    })()
  }, [])

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div
      className={`flex flex-row items-center justify-center ${sizeMap[size]}`}
    >
      <img src={avatarUrl} alt="avatar" />
    </div>
  )
}

export { Avatar }

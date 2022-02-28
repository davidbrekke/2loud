import { UserCircleIcon } from '@heroicons/react/outline'
import { extractFile } from '@lib/extractFile'
import { useAuth } from '@lib/hooks/useAuth'
import { supabase } from '@lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

const NoAvatar = () => {
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarFileName, setAvatarFileName] = useState(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const avatarRef = useRef<HTMLInputElement>(null)

  return previewAvatarUrl ? (
    <div className="relative">
      <div className="flex flex-row items-center justify-center shadow-xl w-24 h-24 rounded-lg overflow-clip transition hover:shadow-2xl">
        <Image width={100} height={100} src={previewAvatarUrl} alt="avatar" />
      </div>
      {uploadingAvatar ? (
        <span className="text-sm text-gray-700 absolute font-bold -bottom-8 -left-0.5 py-1/2 px-2">
          uploading...
        </span>
      ) : (
        <span
          onClick={async () => {
            setUploadingAvatar(true)
            const { error: uploadAvatarError } = await supabase.storage
              .from('avatars')
              .upload(avatarFileName, avatarFile)
            if (uploadAvatarError) {
              console.error(uploadAvatarError)
            }
            const { error: updadeAvatarError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                avatar_url: avatarFileName,
                updated_at: new Date(),
              })
            if (updadeAvatarError) {
              console.error(updadeAvatarError)
            }
            setUploadingAvatar(false)
            router.reload()
          }}
          className="text-sm text-gray-700 absolute font-bold -bottom-8 -left-0.5 cursor-pointer rounded transition py-1/2 px-2 hover:shadow-xl hover:bg-white hover:bg-opacity-30"
        >
          save
        </span>
      )}
    </div>
  ) : (
    <div
      className="flex flex-row items-center justify-center shadow-xl w-24 h-24 rounded-lg m-auto bg-white bg-opacity-30 transition hover:shadow-2xl cursor-pointer"
      onClick={() => {
        const avatar = avatarRef.current
        avatar?.click()
      }}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={avatarRef}
        onChange={(evt) => {
          const { file, localUrl, fileName } = extractFile(evt, user)
          setPreviewAvatarUrl(localUrl)
          setAvatarFile(file)
          setAvatarFileName(fileName)
        }}
      />
      <UserCircleIcon className="text-white w-16 drop-shadow-xl" />
    </div>
  )
}

export default NoAvatar

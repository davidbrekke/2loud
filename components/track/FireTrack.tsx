import { FireIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Icon } from '@components/icon'

const FireTrack = () => {
  const [isFire, setIsFire] = useState(false)
  return isFire ? (
    <Icon
      icon={<FireIcon />}
      onClick={() => setIsFire(!isFire)}
      size="md"
      color="orange"
    />
  ) : (
    <Icon
      icon={<FireIcon />}
      onClick={() => setIsFire(!isFire)}
      size="md"
      color="white"
    />
  )
}
export default FireTrack

import { FireIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Icon } from '@components/icon'

const FireTrack: React.FC = () => {
  const [isFire, setIsFire] = useState<boolean>(false)
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

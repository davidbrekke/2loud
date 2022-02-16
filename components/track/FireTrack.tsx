import { FireIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const FireTrack = () => {
  const [isFire, setIsFire] = useState(false)
  return isFire ? (
    <FireIcon
      className="w-7 h-7 text-orange-300 cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110 hover:text-orange-300"
      onClick={() => setIsFire(!isFire)}
    />
  ) : (
    <FireIcon
      className="w-7 h-7 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110 hover:text-orange-300"
      onClick={() => setIsFire(!isFire)}
    />
  )
}
export default FireTrack

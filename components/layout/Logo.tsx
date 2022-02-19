import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()
  return (
    <h1
      className="px-2 py-1 text-gray-50 text-3xl border-2 border-gray-50 rounded cursor-pointer transition hover:scale-105"
      onClick={() => router.push('/')}
    >
      2loud
    </h1>
  )
}

export default Logo

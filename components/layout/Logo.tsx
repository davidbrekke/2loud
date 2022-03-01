import Link from 'next/link'

const Logo = () => (
  <Link href="/" passHref>
    <span className="px-2 py-1 text-gray-50 text-3xl border-2 border-gray-50 rounded cursor-pointer transition hover:scale-105">
      2loud
    </span>
  </Link>
)

export default Logo

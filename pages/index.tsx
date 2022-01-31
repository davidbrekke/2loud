import Image from 'next/image'
import logo from '@public/2loud-logos_white.png'
import AnimatePage from '@components/AnimatePage'

export default function App() {
  return (
    <main className="w-screen h-screen flex flex-col items-center bg-gradient-to-tr from-teal-400 via-teal-400 to-indigo-400 justify-center">
      <AnimatePage>
        <Image src={logo} alt="2Loud" width={500} height={500} />
      </AnimatePage>
    </main>
  )
}

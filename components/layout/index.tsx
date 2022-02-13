import { useEffect, useState } from 'react'
import { PlayIcon, VolumeUpIcon } from '@heroicons/react/outline'

const Layout = ({ children }) => {
  return (
    <Background>
      <main className="max-w-6xl min-h-screen max-h-screen m-auto flex flex-col items-center justify-between relative">
        <Header />
        {children}
        <TrackPlayer />
      </main>
    </Background>
  )
}

export default Layout

const Header = () => (
  <header className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
    <Logo />
  </header>
)

const Logo = () => (
  <h1 className="px-2 py-1 text-gray-50 text-3xl border-2 border-gray-50 rounded cursor-pointer transition hover:scale-105">
    2loud
  </h1>
)

const Background = ({ children }) => (
  <div className="min-w-screen min-h-screen bg-gradient-to-tr from-teal-400 via-teal-400 to-indigo-400">
    {children}
  </div>
)

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  return isOpen ? (
    <nav className="w-100 h-100 bg-slate-300">
      <div onClick={() => setIsOpen(false)}>x</div>
      <ul>
        <li>home</li>
        <li>me</li>
        <li>bag</li>
      </ul>
    </nav>
  ) : (
    <nav onClick={() => setIsOpen(true)}>nav</nav>
  )
}

const TrackPlayer = () => {
  return (
    <div className="flex flex-row items-center w-screen max-w-6xl justify-around py-4 absolute z-10 bottom-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <PlayIcon className="w-10 h-10 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125" />
      <div>waveform</div>
      <VolumeUpIcon className="w-8 h-8 text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-125" />
    </div>
  )
}

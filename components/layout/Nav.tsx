import { useState } from 'react'

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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

export default Nav

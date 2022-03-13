interface IconProps {
  icon: any
  onClick: any | null
  size: 'sm' | 'md' | 'lg' | 'xl'
  color: 'orange' | 'white'
}

const Icon: React.FC<IconProps> = ({ icon, onClick, size, color }) => (
  <div
    onClick={onClick ? onClick : null}
    className={`
        ${size === 'sm' && 'w-5 h-5'}
        ${size === 'md' && 'w-7 h-7'}
        ${size === 'lg' && 'w-10 h-10'}
        ${size === 'xl' && 'w-14 h-14'}
        ${color === 'orange' && 'text-orange-200'}
        ${color === 'white' && 'text-white'}
         cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110`}
  >
    {icon}
  </div>
)

export { Icon }

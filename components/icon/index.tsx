const Icon = ({
  icon,
  onClick,
  size,
}: {
  icon: any
  onClick: any | null
  size: 'sm' | 'md' | 'lg'
}) => (
  <div
    onClick={onClick ? onClick : null}
    className={`
        ${size === 'sm' && 'w-5 h-5'}
        ${size === 'md' && 'w-7 h-7'}
        ${size === 'lg' && 'w-10 h-10'}
        text-white cursor-pointer transition drop-shadow hover:drop-shadow-xl hover:scale-110`}
  >
    {icon}
  </div>
)

export { Icon }

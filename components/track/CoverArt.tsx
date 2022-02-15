import Image from 'next/image'

const CoverArt = ({ artwork }) => (
  <Image src={artwork} width={150} height={150} className="rounded-2xl" />
)

export default CoverArt

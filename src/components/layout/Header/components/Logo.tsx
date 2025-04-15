import Link from 'next/link'
import Image from 'next/image'
import logo from '@/base/assets/logo/logo.webp'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative overflow-hidden rounded-lg p-1.5 bg-gradient-to-br from-primary/10 to-primary/5">
        <Image
          src={logo}
          alt="Nizam Cellular Leuwiliang"
          width={40}
          height={40}
          className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          priority
        />
      </div>
      <h1 className='text-xl font-bold bg-gradient-to-r from-gray-800 to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-colors duration-500'>Nizam Cell</h1>
    </Link>
  )
} 
import Link from 'next/link'
import { navLink } from '../data/Header'

interface DesktopNavProps {
  isActiveLink: (href: string) => boolean
}

export default function DesktopNav({ isActiveLink }: DesktopNavProps) {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLink.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`relative px-3 py-2 text-[15px] font-semibold transition-all duration-300 group
              ${isActiveLink(link.href)
                ? 'text-primary'
                : 'text-gray-800 hover:text-primary'}`}
          >
            {link.name}
            <span className={`absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-primary transform transition-transform duration-300 ease-out -translate-x-1/2
              ${isActiveLink(link.href)
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
} 
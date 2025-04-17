import Link from 'next/link'

import { motion } from 'framer-motion'

import { navLink } from '../data/Header'

import { FaFacebook, FaInstagram, FaMapMarkerAlt } from "react-icons/fa"

import { User } from '../types'

interface MobileNavProps {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  isActiveLink: (href: string) => boolean
  user: User | null
}

export default function MobileNav({ isMobileMenuOpen, toggleMobileMenu, isActiveLink, user }: MobileNavProps) {
  if (!isMobileMenuOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed inset-0 bg-background backdrop-blur-lg z-40"
    >
      <div className="container h-full flex flex-col">
        <div className="flex justify-end pt-6 px-6">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-300"
            aria-label="Close menu"
          >
            <div className="w-6 h-6 relative">
              <span className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
              <span className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
            </div>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6">
          <ul className="flex flex-col gap-8">
            {navLink.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-2xl font-medium block py-2 relative group pl-8
                    ${isActiveLink(link.href) ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                  <span className={`absolute left-0 top-1/2 w-1 h-1/2 bg-primary transform transition-transform duration-300 ease-out -translate-y-1/2
                    ${isActiveLink(link.href) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLink.length * 0.1 }}
              className='flex flex-col gap-4 mt-12'
            >
              <Link
                href="/signin"
                className="px-8 py-4 text-gray-700 hover:text-primary transition-colors duration-300 text-xl font-medium text-center border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 text-xl font-medium text-center hover:-translate-y-0.5 hover:shadow-lg"
                onClick={toggleMobileMenu}
              >
                Register
              </Link>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (navLink.length + 1) * 0.1 }}
            className="mt-auto pt-8 pb-6 flex flex-col gap-6"
          >
            <div className="flex items-center gap-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaFacebook className="w-6 h-6 text-primary hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaInstagram className="w-6 h-6 text-primary hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FaMapMarkerAlt className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-gray-700">Jl. Raya Leuwiliang No.123</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 
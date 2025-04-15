"use client"

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/utils/context/AuthContext'

import Logo from './components/Logo'
import DesktopNav from './components/DesktopNav'
import MobileNav from './components/MobileNav'
import ProfileMenu from './components/ProfileMenu'
import AuthButtons from './components/AuthButtons'
import MobileMenuButton from './components/MobileMenuButton'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsProfileOpen(false)
  }

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100'>
      <div className="container px-4 lg:px-8">
        <nav className='flex items-center justify-between h-20'>
          <Logo />

          <DesktopNav isActiveLink={isActiveLink} />

          <div className="flex items-center gap-4">
            {!user ? (
              <AuthButtons />
            ) : (
              <>
                <ProfileMenu
                  isProfileOpen={isProfileOpen}
                  toggleProfile={toggleProfile}
                />
                <ProfileMenu
                  isProfileOpen={isProfileOpen}
                  toggleProfile={toggleProfile}
                  isMobile
                />
              </>
            )}

            <MobileMenuButton
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </nav>

        <AnimatePresence>
          <MobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            isActiveLink={isActiveLink}
            user={user}
          />
        </AnimatePresence>
      </div>
    </header>
  )
}

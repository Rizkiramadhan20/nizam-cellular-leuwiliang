interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

export default function MobileMenuButton({ isMobileMenuOpen, toggleMobileMenu }: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-300 group"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 flex flex-col justify-between">
        <span className={`block w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:translate-x-1'}`}></span>
        <span className={`block w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:translate-x-1'}`}></span>
        <span className={`block w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:translate-x-1'}`}></span>
      </div>
    </button>
  )
} 
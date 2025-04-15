import Link from 'next/link'

interface AuthButtonsProps {
  isMobile?: boolean
}

export default function AuthButtons({ isMobile = false }: AuthButtonsProps) {
  return (
    <div className={`${isMobile ? 'flex flex-col gap-4 mt-12' : 'hidden md:flex items-center gap-4'}`}>
      <Link
        href="/signin"
        className={`${isMobile
          ? 'px-8 py-4 text-gray-700 hover:text-primary transition-colors duration-300 text-xl font-medium text-center border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg'
          : 'px-4 py-2 text-gray-600 hover:text-primary transition-colors duration-300 font-medium relative group'
          }`}
      >
        Login
        {!isMobile && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full"></span>
        )}
      </Link>
      <Link
        href="/signup"
        className={`${isMobile
          ? 'px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 text-xl font-medium text-center hover:-translate-y-0.5 hover:shadow-lg'
          : 'px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 font-medium hover:-translate-y-0.5 hover:shadow-lg'
          }`}
      >
        Register
      </Link>
    </div>
  )
} 
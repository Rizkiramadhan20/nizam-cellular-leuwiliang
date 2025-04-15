"use client"

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'

import Link from 'next/link'

import { FaHome } from 'react-icons/fa'

import toast from 'react-hot-toast'

import { useAuth } from '@/utils/context/AuthContext'

import logo from '@/base/assets/logo/logo.webp'

import { signinSchema, type SigninFormData } from './signin.schema'

export default function SigninLayout() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = async (data: SigninFormData) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred during login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await loginWithGoogle()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred during Google login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen'>
      {/* Left side - Illustration */}
      <div className='hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 p-8 relative overflow-hidden'>
        <div className='absolute inset-0 bg-grid-white/[0.05]'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
        <div className='w-full h-full flex flex-col items-center justify-center text-white space-y-8 relative z-10'>
          <div className='text-center space-y-4 transform transition-all duration-500 hover:scale-105'>
            <h1 className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
              Selamat Datang
            </h1>
            <h2 className='text-3xl font-semibold'>di Nizam Cellular</h2>
          </div>
          <div className='max-w-md space-y-4'>
            <p className='text-xl text-center leading-relaxed text-white/90'>
              Masuk ke akun Anda untuk mengakses layanan terbaik kami dalam penjualan dan perbaikan handphone.
            </p>
            <div className='mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
              <p className='text-lg text-center text-white/90'>
                Belum punya akun?{' '}
                <Link
                  href="/signup"
                  className="text-blue-200 hover:text-white font-medium underline underline-offset-4 transition-colors duration-200"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo and close button */}
          <div className='flex justify-between items-start'>
            <Image
              src={logo}
              alt='logo'
              width={40}
              height={40}
              className='object-contain transform transition-all duration-300 hover:scale-110'
            />
            <Link
              href="/"
              className='text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 group'
            >
              <span className='text-sm font-medium group-hover:translate-x-1 transition-transform'>Kembali ke</span>
              <FaHome className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Form content */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold text-gray-900'>Sign in</h2>
              <p className='text-gray-500 text-sm'>
                Enter your email to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type='email'
                    id='email'
                    {...register('email')}
                    placeholder='jane@example.com'
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    {...register('password')}
                    placeholder='Enter your password'
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 pr-10 transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200'
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Continue'}
              </button>

              <div className="flex w-full flex-col">
                <div className="relative flex items-center justify-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className={`flex items-center justify-center gap-2 w-full bg-white text-gray-700 py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

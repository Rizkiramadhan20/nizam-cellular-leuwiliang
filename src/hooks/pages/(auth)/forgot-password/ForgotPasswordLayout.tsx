"use client"

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'

import Link from 'next/link'

import toast from 'react-hot-toast'

import { useAuth } from '@/utils/context/AuthContext'

import logo from '@/base/assets/logo/logo.webp'

import { z } from 'zod'

import { FaSignInAlt } from "react-icons/fa";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordLayout() {
  const [isLoading, setIsLoading] = useState(false)
  const { forgotPassword } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      await forgotPassword(data.email)
      toast.success('Password reset email sent! Please check your inbox.')
      router.push('/signin')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while sending reset email')
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
              Reset Password
            </h1>
            <h2 className='text-3xl font-semibold'>Nizam Cellular</h2>
          </div>
          <div className='max-w-md space-y-4'>
            <p className='text-xl text-center leading-relaxed text-white/90'>
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
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
              href="/signin"
              className='text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 group'
            >
              <span className='text-sm font-medium group-hover:translate-x-1 transition-transform'>Back to</span>
              <FaSignInAlt className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Form content */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold text-gray-900'>Reset Password</h2>
              <p className='text-gray-500 text-sm'>
                Enter your email to receive reset instructions
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

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
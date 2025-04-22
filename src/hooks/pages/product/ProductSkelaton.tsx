import React from 'react'

export default function AboutSkelaton() {
  return (
    <section className='min-h-screen py-28 md:py-32 flex justify-center items-center bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50'>
      <div className='container px-4 sm:px-6 lg:px-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
          {/* Left Column */}
          <div className='flex flex-col gap-10'>
            {/* Title Section */}
            <div className='space-y-6'>
              <div className='h-8 w-32 bg-gray-200 rounded-full relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='h-16 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
            </div>

            {/* Number Cards Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200'>
                  <div className='h-12 w-24 bg-gray-200 rounded-lg relative overflow-hidden mb-3'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='h-4 w-20 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <div className='h-14 w-40 bg-gray-200 rounded-full relative overflow-hidden'>
              <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className='flex flex-col gap-8'>
            {[1, 2].map((item) => (
              <div key={item} className='space-y-4'>
                <div className='h-24 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className='mt-20 sm:mt-32'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='relative overflow-hidden rounded-3xl'>
                <div className='w-full h-[400px] bg-gray-200 relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
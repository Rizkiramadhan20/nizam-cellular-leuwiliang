import React from 'react'

export default function ContactSkelaton() {
  return (
    <section className='min-h-screen py-28 relative overflow-hidden bg-gradient-to-b from-background to-background/95'>
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16 relative">
        {/* Header Section */}
        <div className='flex flex-col items-center gap-4 sm:gap-6 text-center mx-auto max-w-3xl'>
          <div className='h-8 w-32 bg-gray-200 rounded-full relative overflow-hidden'>
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='h-12 w-full max-w-2xl bg-gray-200 rounded-lg relative overflow-hidden'>
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='h-8 w-full max-w-xl bg-gray-200 rounded-lg relative overflow-hidden'>
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12'>
          {/* Left Column */}
          <div className='flex flex-col gap-6 sm:gap-8'>
            {/* Features Section */}
            <div className='space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'>
              {[1, 2].map((item) => (
                <div key={item} className='flex items-center gap-3 sm:gap-4'>
                  <div className='h-12 w-12 bg-gray-200 rounded-full relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden'>
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                    <div className='h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Section */}
            <div className='p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'>
              <div className='space-y-4'>
                <div className='h-6 w-24 mx-auto bg-gray-200 rounded-lg relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='h-24 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='flex items-center gap-3 justify-center'>
                  <div className='h-12 w-12 bg-gray-200 rounded-full relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className='p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'>
            <div className='space-y-4 sm:space-y-6'>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className='space-y-2'>
                  <div className='h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='h-12 w-full bg-gray-200 rounded-xl relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                </div>
              ))}
              <div className='h-12 w-full bg-gray-200 rounded-xl relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <section className='mt-20'>
        <div className='container px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16 py-10 rounded-md relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="flex flex-col gap-4 sm:gap-6 h-full bg-background border border-[var(--border-color)] rounded-2xl p-4 sm:p-6">
                  <div className="h-24 w-24 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="bg-gray-200 rounded-2xl shadow-sm overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
              <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
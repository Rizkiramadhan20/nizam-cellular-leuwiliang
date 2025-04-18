import React from 'react'

export default function GallerySkelaton() {
  return (
    <section className='min-h-screen py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-100 via-white to-gray-100 relative'>
      <div className="container px-3 sm:px-6 lg:px-8 mx-auto">
        {/* Filter Skeleton */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6 md:mb-10'>
          <div className='flex flex-col gap-1 md:gap-2'>
            <div className="h-10 w-48 bg-gray-200 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-start md:justify-center gap-2 md:gap-3 w-full md:w-auto">
            <div className="h-8 w-24 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="break-inside-avoid mb-3 md:mb-4">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-md bg-white">
                <div className="relative w-full aspect-[4/3] bg-gray-200">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
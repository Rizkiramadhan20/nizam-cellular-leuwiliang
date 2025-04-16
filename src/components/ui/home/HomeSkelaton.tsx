import React from 'react'

export default function HomeSkelaton() {
  return (
    <section className='min-h-screen relative bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden flex items-center justify-center'>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb10_1px,transparent_1px),linear-gradient(to_bottom,#2563eb10_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb10_1px,transparent_1px),linear-gradient(to_bottom,#2563eb10_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-indigo-50/20 to-purple-50/20"></div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Section */}
          <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
            {/* Badge Skeleton */}
            <div className='inline-block py-2 px-5 bg-white/90 backdrop-blur-md rounded-full border border-blue-100/50 shadow-sm'>
              <div className='w-24 h-4 bg-gray-200 rounded-full relative overflow-hidden'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>

            {/* Title Skeleton */}
            <div className='h-16 bg-gray-200 rounded-lg relative overflow-hidden max-w-2xl'>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>

            {/* Typing Text Skeleton */}
            <div className="h-[2.5rem]">
              <div className='w-48 h-8 bg-gray-200 rounded-lg relative overflow-hidden'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className='space-y-3 max-w-2xl'>
              <div className='h-4 bg-gray-200 rounded relative overflow-hidden'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
              <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-5/6'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
              <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-4/6'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <div className='w-32 h-12 bg-gray-200 rounded-xl relative overflow-hidden'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
              <div className='w-32 h-12 bg-gray-200 rounded-xl relative overflow-hidden'>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="w-full h-[400px] bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Blobs */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
      <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
      <div className="absolute left-1/4 bottom-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[80px]" />
    </section>
  );
}
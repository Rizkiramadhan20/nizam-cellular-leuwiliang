import React from 'react'

export default function BlogSkelaton() {
  return (
    <section className='min-h-screen py-16 bg-[#0A0A0A] text-white relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className='flex flex-col gap-6 items-center justify-center text-center mb-16'>
          <div className="h-8 w-24 bg-zinc-800 rounded-full animate-pulse"></div>
          <div className="h-12 w-3/4 max-w-2xl bg-zinc-800 rounded-lg animate-pulse"></div>
        </div>

        {/* Top Blog Skeleton */}
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50">
            <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-zinc-800 animate-pulse"></div>
            <div className="p-6 lg:p-12 flex flex-col justify-center bg-zinc-900/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-24 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="h-4 w-32 bg-zinc-800 rounded-full animate-pulse"></div>
              </div>
              <div className="h-8 w-3/4 bg-zinc-800 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-zinc-800 rounded-lg mb-2 animate-pulse"></div>
              <div className="h-4 w-5/6 bg-zinc-800 rounded-lg mb-8 animate-pulse"></div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse"></div>
                <div>
                  <div className="h-4 w-24 bg-zinc-800 rounded-lg mb-1 animate-pulse"></div>
                  <div className="h-3 w-16 bg-zinc-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Skeletons */}
        <div className='flex items-center gap-2 sm:gap-4 mb-10 overflow-y-auto'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-10 w-24 bg-zinc-800 rounded-full animate-pulse"></div>
          ))}
        </div>

        {/* Blog Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="block bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50">
              <div className="relative h-64 overflow-hidden bg-zinc-800 animate-pulse"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-zinc-800 rounded-full animate-pulse"></div>
                </div>
                <div className="h-6 w-3/4 bg-zinc-800 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-4 w-full bg-zinc-800 rounded-lg mb-2 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-800 rounded-lg mb-6 animate-pulse"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                  <div className="flex flex-col">
                    <div className="h-4 w-24 bg-zinc-800 rounded-lg mb-1 animate-pulse"></div>
                    <div className="h-3 w-16 bg-zinc-800 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
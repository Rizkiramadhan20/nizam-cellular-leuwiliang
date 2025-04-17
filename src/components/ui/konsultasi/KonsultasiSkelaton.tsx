import React from 'react'

export default function KonsultasiSkelaton() {
  return (
    <section className='min-h-screen'>
      <div className="container">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Consultation Info Skeleton */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>

                  <div className="h-8 w-48 sm:w-64 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="h-24 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                  <div className="flex flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="h-12 w-32 sm:w-40 bg-gray-200 rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-12 w-32 sm:w-40 bg-gray-200 rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar Skeleton */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="h-8 w-48 sm:w-64 bg-gray-200 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {[...Array(35)].map((_, i) => (
                  <div key={i} className="aspect-square w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
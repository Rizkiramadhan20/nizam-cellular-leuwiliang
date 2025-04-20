import React from 'react'

export default function BlogSkelaton() {
  return (
    <section className='min-h-screen'>
      {/* Hero Section Skeleton */}
      <div className='min-h-[40vh] md:min-h-[60vh] relative py-16 md:py-28 overflow-hidden bg-[#0A0A0A]'>
        <div className="container px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center mt-24">
            <div className="mb-4 md:mb-6">
              <div className="w-24 h-8 bg-gray-700 rounded-full mx-auto relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
              </div>
            </div>
            <div className="h-12 md:h-16 w-3/4 bg-gray-700 rounded-lg mx-auto mb-4 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
            </div>
            <div className="h-12 md:h-16 w-1/2 bg-gray-700 rounded-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid Section Skeleton */}
      <section className='bg-gray-50 py-6 md:py-10 min-h-screen'>
        <div className="container px-4 sm:px-6 lg:px-10">
          {/* Top Blog Skeleton */}
          <div className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 bg-white rounded-3xl p-6">
              <div className="w-full h-[150px] md:h-[350px] bg-gray-200 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
              <div className="space-y-4">
                <div className="w-24 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="w-full h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="w-24 h-3 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="flex gap-4 overflow-x-auto pb-2 w-full">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-24 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-80 h-12 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
          </div>

          {/* Blog Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <div className="w-full h-[300px] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="w-24 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="w-full h-6 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="w-full h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-10 md:mt-14 flex justify-center">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
import React from 'react'

export default function ContactSkelaton() {
  return (
    <section className='min-h-screen'>
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          </div>
          <div className="h-4 w-64 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          </div>
        </div>
        <div className="h-12 w-full sm:w-40 bg-gray-200 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
        </div>
      </div>

      {/* Content Cards Grid Skeleton */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className='w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100'
          >
            <div className="flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-[300px] w-full bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    <div className="h-8 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                      <div className="h-4 w-4/6 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
                  <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
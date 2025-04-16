import React from 'react'

export default function FaqsSkelaton() {
  return (
    <section className='min-h-screen'>
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white border border-[var(--border-color)] p-6 sm:p-8 rounded-2xl shadow-sm">
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
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className='w-full bg-[var(--background)] rounded-2xl shadow-sm overflow-hidden border border-[var(--border-color)]'
          >
            <div className="flex flex-col">
              {/* Image Section */}
              <div className="relative w-full">
                <div className="w-full h-[300px] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col justify-between w-full">
                <div className="space-y-6">
                  <div className="h-8 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3].map((faq) => (
                      <div
                        key={faq}
                        className="bg-[var(--background)] rounded-xl overflow-hidden border border-[var(--border-color)]"
                      >
                        <div className="p-4">
                          <div className="h-6 w-3/4 bg-gray-200 rounded relative overflow-hidden mb-2">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                          </div>
                          <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 mt-6 border-t border-[var(--border-color)]">
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
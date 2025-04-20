import React from 'react'

export default function BlogSkelaton() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Hero Section Skeleton */}
        <div className="relative pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-12 md:pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl sm:rounded-3xl" />
          <div className="relative max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white shadow-sm">
              <div className="w-20 h-4 bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>

            <div>
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 bg-gray-200 rounded-lg mx-auto relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="ml-3 text-left">
                  <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="w-20 h-3 mt-1 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block h-6 w-px bg-gray-200" />
              <div className="flex items-center">
                <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>
              <div className="hidden sm:block h-6 w-px bg-gray-200" />
              <div className="flex items-center">
                <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="relative mb-8 sm:mb-12 md:mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl sm:rounded-3xl" />
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-2xl sm:rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          </div>
        </div>

        {/* Breadcrumbs Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
            <div className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
            <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-[var(--border-color)]">
                <div className="w-24 h-6 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content Skeleton */}
          <article className="flex-1 order-1 lg:order-2">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Related Articles Skeleton */}
        <div className='mt-16 sm:mt-20 md:mt-24 mb-12 sm:mb-16'>
          <div className="flex flex-col gap-4">
            <div className="w-48 h-8 bg-gray-200 rounded-lg mb-6 sm:mb-8 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--border-color)]">
                  <div className="w-full aspect-video bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className='flex justify-between items-center mb-2 sm:mb-3'>
                      <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                      <div className="w-16 h-4 bg-gray-200 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                      </div>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-lg mb-2 sm:mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
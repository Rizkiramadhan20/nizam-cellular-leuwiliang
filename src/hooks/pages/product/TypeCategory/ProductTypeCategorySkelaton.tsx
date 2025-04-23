import React from 'react'

export default function ProductSkelaton() {
  return (
    <>
      {/* Banner Section */}
      <div className='pt-28 container px-4 sm:px-6 lg:px-8 xl:px-10'>
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[400px] bg-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
          <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
        </div>
      </div>

      {/* Product Categories Section */}
      <section className='min-h-screen py-12 sm:py-16'>
        <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-square bg-gray-200">
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Latest Products Section */}
          <div className="mt-16">
            <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden mb-10">
              <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={item} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <div className="relative aspect-square bg-gray-200">
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="h-6 w-full bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                      <div className="h-6 w-20 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
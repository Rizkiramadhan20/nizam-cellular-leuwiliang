import React from 'react'

export default function ProductSkelaton() {
  return (
    <section className='min-h-screen bg-white py-28'>
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1fr] gap-8 lg:gap-16">
          {/* Image Gallery Section */}
          <aside className='space-y-4'>
            <div className='w-full aspect-[4/5] relative rounded-lg overflow-hidden bg-gray-200'>
              <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
            </div>
            <div className='flex gap-2 overflow-x-auto pb-2'>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="relative w-28 h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              ))}
            </div>
          </aside>

          {/* Product Details Section */}
          <article className='lg:sticky lg:top-24 lg:h-fit space-y-6'>
            <div className='space-y-4 pb-6 border-b border-gray-200'>
              <div className='h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='h-8 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
              <div className='h-6 w-40 bg-gray-200 rounded-lg relative overflow-hidden'>
                <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='flex flex-wrap gap-4'>
                {[1, 2, 3].map((item) => (
                  <div key={item} className='h-8 w-32 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                ))}
              </div>

              <div className='space-y-6 pt-4 border-t border-gray-200'>
                <div className='h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='h-12 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className='mt-16 pt-8 border-t border-gray-200'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Author and Description Section */}
            <div>
              <div className='mb-8'>
                <div className='h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden mb-4'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg'>
                  <div className='w-16 h-16 rounded-full bg-gray-200 relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden'>
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                    <div className='h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden'>
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-4'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='bg-gray-50 p-6 rounded-lg space-y-4'>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden'>
                      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category and Related Products Section */}
            <div>
              <div className='mb-8'>
                <div className='h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden mb-4'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg'>
                  <div className='w-12 h-12 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                  <div className='h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                  </div>
                </div>
              </div>

              <div>
                <div className='h-6 w-40 bg-gray-200 rounded-lg relative overflow-hidden mb-4'>
                  <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className='bg-white rounded-lg overflow-hidden border border-gray-100'>
                      <div className='aspect-square bg-gray-200 relative overflow-hidden'>
                        <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                      </div>
                      <div className='p-4 space-y-2'>
                        <div className='h-4 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden'>
                          <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                        </div>
                        <div className='h-4 w-1/2 bg-gray-200 rounded-lg relative overflow-hidden'>
                          <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
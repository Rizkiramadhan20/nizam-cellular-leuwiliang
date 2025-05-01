import React from 'react'

export default function FaqsSkelaton() {
  return (
    <section className='min-h-full py-12 bg-white'>
      <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg max-w-md mx-auto mb-4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
          <div className="h-6 bg-gray-200 rounded-lg max-w-sm mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 bg-gray-200 rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
            </div>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <div className="w-full flex justify-between items-center py-5">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>
                <div className="h-5 w-5 bg-gray-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
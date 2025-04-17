import React from 'react'

export default function FaqsSkelaton() {
  return (
    <section className='min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="h-12 sm:h-16 md:h-20 bg-gray-200 rounded-lg max-w-3xl mx-auto mb-4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
          <div className="h-6 bg-gray-200 rounded-lg max-w-xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6 sm:space-y-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100/50"
            >
              <div className={`flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className="md:w-1/2">
                  <div className="h-8 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  </div>
                  <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-200">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  </div>
                </div>

                {/* FAQ Content */}
                <div className="md:w-1/2 space-y-3 sm:space-y-4">
                  {[...Array(3)].map((_, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="collapse collapse-plus bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg"
                    >
                      <div className="collapse-title">
                        <div className="flex items-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 mr-2 sm:mr-3 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                          </div>
                          <div className="h-6 bg-gray-200 rounded-lg w-3/4 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                          </div>
                        </div>
                      </div>
                      <div className="collapse-content">
                        <div className="h-4 bg-gray-200 rounded-lg w-full mb-2 relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                        </div>
                        <div className="h-4 bg-gray-200 rounded-lg w-5/6 relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
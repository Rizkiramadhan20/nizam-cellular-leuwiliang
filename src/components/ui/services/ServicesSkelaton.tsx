import React from 'react'
import { motion } from 'framer-motion'

export default function ServicesSkelaton() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='min-h-screen py-16 sm:py-24 relative overflow-hidden'
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-primary/50 overflow-hidden hover:border-primary/70 hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b-2 border-primary/50 bg-gradient-to-r from-blue-50/30 via-white/30 to-blue-50/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-100/50 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/20 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-white/20 via-white/30 to-white/20"></div>
                  </div>
                </div>
                <div>
                  <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                  <div className="h-4 w-36 bg-gray-200 rounded-lg mt-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-6 sm:gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-primary/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden relative"
                >
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200"></div>
                          </div>
                          <div className="h-6 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                          </div>
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-16 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                      </div>

                      <div className="w-full lg:w-2/5">
                        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border-2 border-primary/50 bg-gray-200">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
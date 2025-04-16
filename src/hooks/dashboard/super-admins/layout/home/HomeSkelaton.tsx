import React from 'react'
import { motion } from 'framer-motion'

export default function HomeSkelaton() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='min-h-screen'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-background border border-[var(--border-color)] p-6 sm:p-8 rounded-2xl shadow-sm"
      >
        <div className="space-y-3">
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.1
        }}
        className='w-full bg-background rounded-2xl shadow-sm overflow-hidden border border-gray-200'
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 sm:order-1"
          >
            <div className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <div className="h-4 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>

                <div className="h-8 w-full bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>

                <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>

                <div className="h-10 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="h-12 w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative aspect-[4/3] lg:aspect-square w-full order-1 sm:order-2 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
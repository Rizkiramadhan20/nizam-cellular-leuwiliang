import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaLaptopCode } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

export const FeatureCards = () => {
  return (
    <>
      {/* Hardware Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer absolute top-16 sm:top-28"
      >
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-2xl transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <FaTools className="w-8 h-8 text-blue-600 transform group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Hardware</h3>
        </div>
      </motion.div>

      {/* Software Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:block bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer absolute bottom-16 sm:bottom-28"
      >
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <FaLaptopCode className="w-8 h-8 text-indigo-600 transform group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">Software</h3>
        </div>
      </motion.div>

      {/* Pulsa & Voucher Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden lg:block bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer absolute top-16 sm:top-20 right-4 sm:right-24"
      >
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 blur-2xl transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <MdPayments className="w-8 h-8 text-purple-600 transform group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Pulsa & Voucher</h3>
        </div>
      </motion.div>
    </>
  );
}; 
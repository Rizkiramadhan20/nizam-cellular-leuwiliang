import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HomeType } from '@/components/ui/home/types/Home';

interface HeroContentProps {
  item: HomeType;
  currentIndex: number;
}

export const HeroContent = ({ item, currentIndex }: HeroContentProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='inline-block py-1.5 sm:py-2 px-4 sm:px-5 bg-white/90 backdrop-blur-md rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300'
        >
          <span className='text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            {item.text}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight'
        >
          {item.title}
        </motion.h1>

        <div className="h-[2rem] sm:h-[2.5rem] overflow-hidden">
          <AnimatePresence mode="wait">
            {item.typing.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative inline-flex items-center"
              >
                <motion.div
                  className="relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.h1
                    className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap capitalize"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  >
                    {item.typing[currentIndex]?.title}
                  </motion.h1>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed tracking-wide max-w-2xl mx-auto lg:mx-0'
        >
          {item.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'
        >
          <Link
            href={item.button1.href}
            className='px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl text-gray-700 hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] font-medium shadow-sm text-sm sm:text-base'
          >
            {item.button1.text}
          </Link>

          <Link
            href={item.button2.href}
            className='px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] font-medium shadow-lg shadow-blue-500/20 text-sm sm:text-base'
          >
            {item.button2.text}
          </Link>
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex-1 relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mx-auto"
      >
        <div className="relative w-full z-10">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={500}
            height={400}
            quality={100}
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
          />
        </div>
      </motion.div>
    </div>
  );
}; 
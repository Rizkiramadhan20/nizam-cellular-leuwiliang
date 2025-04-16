"use client"

import React, { useState, useEffect } from 'react'

import { ServicesType } from './types/Services';

import { FetchServices } from './lib/FetchServices';

import ServicesSkelaton from './ServicesSkelaton';

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenServices, setHiddenServices] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = FetchServices((newServices) => {
      setServices(newServices);
      if (newServices.length > 0) {
        setHiddenServices(newServices.slice(1).map(service => service.id));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleTitleClick = (serviceId: string) => {
    if (!hiddenServices.includes(serviceId)) {
      return;
    }
    setHiddenServices(services.map(service => service.id).filter(id => id !== serviceId));
  };

  if (loading) {
    return <ServicesSkelaton />;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

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
          className="bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-primary/50 overflow-hidden hover:border-primary/70 hover:shadow-xl transition-all duration-300">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b-2 border-primary/50 bg-gradient-to-r from-blue-50/30 via-white/30 to-blue-50/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-100/50 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Layanan Kami</h2>
                  <p className="text-gray-600/90 mt-1 text-sm sm:text-base">Pilihan layanan terbaik untuk Anda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:gap-8">
              {services.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-primary/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg hover:border-primary/70 transition-all duration-300 overflow-hidden relative"
                >
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <motion.h3
                          className="text-xl sm:text-2xl font-semibold text-gray-900 cursor-pointer flex items-center gap-3 group mb-4"
                          onClick={() => handleTitleClick(item.id)}
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 group-hover:rotate-180 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                          </svg>

                          <span className="group-hover:text-blue-600 transition-colors">{item.title}</span>
                        </motion.h3>
                        <span className="text-sm sm:text-base text-gray-600/90 hover:text-gray-800 transition-colors">{item.text}</span>
                        <p className="text-gray-600/80 leading-relaxed text-sm sm:text-base hover:text-gray-700 transition-colors">{item.description}</p>
                      </div>

                      <AnimatePresence mode="wait">
                        {!hiddenServices.includes(item.id) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -20 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          className="w-full lg:w-2/5"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border-2 border-primary/50 hover:border-primary/70 transition-all duration-300">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                              priority
                            />
                          </motion.div>
                        </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}


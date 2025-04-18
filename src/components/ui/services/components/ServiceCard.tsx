import React from 'react';

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';

import { ServiceCardProps } from '@/components/ui/services/types/Services';

import { imageAnimation } from '@/components/ui/services/lib/animations';

export default function ServiceCard({ service, isHidden, onTitleClick }: ServiceCardProps) {
    return (
        <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-primary/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-lg hover:border-primary/70 transition-all duration-300 overflow-hidden relative"
        >
            <div className="p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                    <div className="flex-1 space-y-3 sm:space-y-4">
                        <motion.h3
                            className="text-xl sm:text-2xl font-semibold text-gray-900 cursor-pointer flex items-center gap-3 group mb-4"
                            onClick={() => onTitleClick(service.id)}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 group-hover:rotate-180 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            <span className="group-hover:text-blue-600 transition-colors">{service.title}</span>
                        </motion.h3>
                        <span className="text-sm sm:text-base text-gray-600/90 hover:text-gray-800 transition-colors">{service.text}</span>
                        <p className="text-gray-600/80 leading-relaxed text-sm sm:text-base hover:text-gray-700 transition-colors">{service.description}</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isHidden && (
                            <motion.div
                                {...imageAnimation}
                                className="w-full lg:w-2/5"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border-2 border-primary/50 hover:border-primary/70 transition-all duration-300">
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.title}
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
    );
} 
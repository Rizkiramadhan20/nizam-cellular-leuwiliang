import React from 'react';

import { motion } from 'framer-motion';

import { titleAnimation } from '@/components/ui/services/lib/animations';

export default function ServicesHeader() {
    return (
        <div className="p-6 sm:p-8 border-b-2 border-primary/50 bg-gradient-to-r from-blue-50/30 via-white/30 to-blue-50/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-100/50 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                    <motion.div {...titleAnimation}>
                        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Layanan Kami</h2>
                        <p className="text-gray-600/90 mt-1 text-sm sm:text-base">Pilihan layanan terbaik untuk Anda</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 
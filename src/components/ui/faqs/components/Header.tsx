import React from 'react';

import { motion } from 'framer-motion';

export const Header = () => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
        >
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600'>
                Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum tentang layanan kami dan dapatkan dukungan yang Anda butuhkan
            </p>
        </motion.div>
    );
}; 
import { motion } from 'framer-motion';

import { GalleryFilterProps } from '@/components/ui/gallery/types/Gallery';

export default function GalleryFilter({ activeSection, setActiveSection }: GalleryFilterProps) {
    return (
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6 md:mb-10'>
            <motion.div
                className='flex flex-col gap-1 md:gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <motion.h3
                    className='text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Gallery Kami
                </motion.h3>
                <motion.p
                    className='text-gray-600 text-sm sm:text-base md:text-lg max-w-md'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Beberapa gallery kami
                </motion.p>
            </motion.div>

            <div className="flex flex-wrap justify-start md:justify-center gap-2 md:gap-3 w-full md:w-auto">
                <button
                    onClick={() => setActiveSection('section1')}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === 'section1'
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Section 1
                </button>
                <button
                    onClick={() => setActiveSection('section2')}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeSection === 'section2'
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Section 2
                </button>
            </div>
        </div>
    );
} 
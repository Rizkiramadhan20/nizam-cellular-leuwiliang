import React from 'react'

import { motion } from 'framer-motion'

import { useInView } from 'react-intersection-observer'

export default function FaqsHeader() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
            <h1 className='text-3xl font-bold mb-4 text-gray-900'>
                Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-gray-600">
                Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
        </motion.div>
    )
}

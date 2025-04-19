import React from 'react';

import { motion } from 'framer-motion';

const ContactHeader: React.FC = () => {
    return (
        <div className='flex flex-col items-center gap-4 sm:gap-6 text-center mx-auto max-w-3xl'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20'
            >
                <span className='text-primary font-medium text-sm sm:text-base'>Contact Us</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold'
            >
                Hubungi tim kami
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl'
            >
                Kami siap membantu dan menjawab pertanyaan apa pun yang mungkin Anda miliki. Kami menunggu kabar dari Anda.
            </motion.p>
        </div>
    );
};

export default ContactHeader; 
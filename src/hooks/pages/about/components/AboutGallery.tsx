"use client"

import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { AboutGalleryProps } from "@/hooks/pages/about/types/About"

const AboutGallery = ({ about, inView }: AboutGalleryProps) => {
    return (
        <div className='mt-20 sm:mt-32'>
            {about.map((item) => (
                <div key={item.id} className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {item.imageUrl.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8 + (index * 0.2) }}
                            className={`relative overflow-hidden rounded-3xl group transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-2xl ${index === 0 ? 'rotate-[-3deg]' :
                                index === 1 ? 'rotate-[0deg]' :
                                    'rotate-[3deg]'
                                } hover:rotate-0`}
                        >
                            <Image
                                src={img.images}
                                alt={'about image'}
                                width={1200}
                                height={800}
                                className='w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.95]'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>
                            <div className='absolute inset-0 bg-blue-900/20 mix-blend-multiply'></div>
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AboutGallery; 
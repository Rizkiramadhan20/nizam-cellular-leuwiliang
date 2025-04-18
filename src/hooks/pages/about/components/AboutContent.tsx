"use client"

import React from 'react'

import { motion } from 'framer-motion'

import Link from 'next/link'

import { AboutContentProps } from "@/hooks/pages/about/types/About"

import NumberCard from '@/hooks/pages/about/components/NumberCard'

const AboutContent = ({ about, inView }: AboutContentProps) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
            <div className='flex flex-col gap-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className='space-y-6'
                >
                    <h3 className='text-sm font-semibold tracking-wider text-indigo-600 uppercase px-4 py-2 bg-background border border-[var(--border-color)] rounded-full w-fit'>ABOUT US</h3>
                    <h1 className='text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight'>
                        {about.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                            >
                                {item.title}
                            </motion.div>
                        ))}
                    </h1>
                </motion.div>

                <div className='flex flex-col gap-4'>
                    {about.map((item) => (
                        <div key={item.id} className='grid grid-cols-2 sm:grid-cols-3 gap-6'>
                            {item.count.map((desc, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                                >
                                    <NumberCard number={desc.number} title={desc.title} />
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/about"
                        className='group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white rounded-full overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 w-fit'
                    >
                        <span className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300'></span>
                        <span className='relative z-10 flex items-center gap-2'>
                            Learn More
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </motion.div>
            </div>

            <div className='flex flex-col gap-8 text-gray-600'>
                {about.map((item) => (
                    <div key={item.id} className='space-y-8'>
                        {item.description.map((desc, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                                className='text-lg leading-relaxed text-gray-700'
                            >
                                {desc.description}
                            </motion.p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutContent; 
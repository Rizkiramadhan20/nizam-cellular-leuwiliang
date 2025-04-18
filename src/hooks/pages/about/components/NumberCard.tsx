"use client"

import React, { useState, useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'

import { useInView } from 'react-intersection-observer'

import { NumberCardProps } from '@/hooks/pages/about/types/About'

const NumberCard = ({ number, title }: NumberCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const controls = useAnimation();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = number / steps;
            const interval = duration / steps;

            let currentCount = 0;
            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= number) {
                    setCount(number);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(currentCount));
                }
            }, interval);

            return () => clearInterval(timer);
        }
    }, [inView, number, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className='bg-white/80 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 border border-[var(--border-color)] hover:border-indigo-200 hover:scale-105 hover:bg-white'
        >
            <h2 className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>+{count}</h2>
            <p className='text-gray-600 text-sm font-medium'>{title}</p>
        </motion.div>
    );
};

export default NumberCard; 
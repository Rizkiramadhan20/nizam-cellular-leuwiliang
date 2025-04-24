import React from 'react';

import { motion } from 'framer-motion';

import Image from 'next/image';

import { FAQItemProps } from '@/components/ui/faqs/types/Faqs';

export const FAQItem = ({ faq }: FAQItemProps) => {
    const isEvenId = parseInt(faq.id) % 2 === 0;

    return (
        <div
            key={faq.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-[var(--border-color)]"
        >
            <div className={`flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 ${isEvenId ? 'md:flex-row-reverse' : ''}`}>
                <div
                    className="md:w-1/2"
                >
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800'
                    >
                        {faq.title}
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden group"
                    >
                        <Image
                            src={faq.imageUrl}
                            alt={faq.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ x: isEvenId ? -30 : 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="md:w-1/2 space-y-3 sm:space-y-4"
                >
                    {faq.faqs.map((item, faqIndex) => (
                        <motion.div
                            key={faqIndex}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.5 + faqIndex * 0.1 }}
                            className="collapse collapse-plus bg-white/50 backdrop-blur-sm border border-[var(--border-color)] rounded-lg hover:border-[var(--border-color)] transition-all duration-200 hover:shadow-md"
                        >
                            <input
                                type="radio"
                                name={`my-accordion-${faq.id}`}
                                defaultChecked={faqIndex === 0}
                                id={`faq-${faq.id}-${faqIndex}`}
                                aria-label={`Toggle ${item.title} FAQ section`}
                            />
                            <div className="collapse-title text-base sm:text-lg font-semibold text-gray-800 hover:text-gray-900 flex items-center">
                                <span className="hidden sm:flex mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 text-primary-600 items-center justify-center text-xs sm:text-sm font-bold">
                                    {faqIndex + 1}
                                </span>
                                {item.title}
                            </div>
                            <div className="collapse-content text-sm sm:text-base text-gray-600">
                                <p className="leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}; 
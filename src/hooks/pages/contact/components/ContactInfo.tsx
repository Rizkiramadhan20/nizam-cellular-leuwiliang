import React from 'react';

import { motion } from 'framer-motion';

import { ContactType } from '@/hooks/pages/contact/types/Contact';

import Image from 'next/image';

import Link from 'next/link';

interface ContactInfoProps {
    contact: ContactType[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {contact.map((item, index) => (
                <div key={item.id} className="group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex flex-col gap-4 sm:gap-6 h-full bg-background border border-[var(--border-color)] rounded-2xl p-4 sm:p-6"
                    >
                        <div className="relative">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                quality={100}
                                loading='lazy'
                                className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-full bg-primary/10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{item.title}</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{item.description}</p>

                            <Link
                                href={item.href}
                                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-xs sm:text-sm font-medium"
                            >
                                {item.text}
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default ContactInfo; 
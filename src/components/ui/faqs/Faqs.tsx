"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { FetchFaqs } from "@/components/ui/faqs/lib/FetchFaqs"

import { FaqsType } from "@/components/ui/faqs/types/Faqs"

import FaqsSkelaton from "@/components/ui/faqs/FaqsSkelaton"

import dynamic from 'next/dynamic'

const BackgroundElements = dynamic(() => import('@/components/ui/faqs/components/BackgroundElements').then(mod => mod.BackgroundElements), { ssr: false })

const Header = dynamic(() => import('@/components/ui/faqs/components/Header').then(mod => mod.Header), { ssr: false })

const FAQItem = dynamic(() => import('@/components/ui/faqs/components/FAQItem').then(mod => mod.FAQItem), { ssr: false })

export default function Faqs() {
  const [faqs, setFaqs] = useState<FaqsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FetchFaqs((newFaqs) => {
      setFaqs(newFaqs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <FaqsSkelaton />;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-100 via-white to-gray-100 relative overflow-hidden'
    >
      <BackgroundElements />

      <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Container blur effect */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-3xl -z-10" />

        <Header />

        <div className="space-y-6 sm:space-y-8">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

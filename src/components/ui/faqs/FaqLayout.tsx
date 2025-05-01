"use client"

import React, { useEffect, useState } from 'react'

import { FetchFaqs } from "@/components/ui/faqs/lib/FetchFaqs"

import { FaqsType } from "@/components/ui/faqs/types/Faqs"

import FaqsSkelaton from "@/components/ui/faqs/FaqsSkelaton"

import FaqsHeader from "@/components/ui/faqs/components/FaqsHeader"

import FaqsNavigation from '@/components/ui/faqs/components/FaqsNavigation'

import FaqsContent from '@/components/ui/faqs/components/FaqsContent'

export default function Faqs() {
    const [faqs, setFaqs] = useState<FaqsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTitle, setActiveTitle] = useState<string>("");
    const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const unsubscribe = FetchFaqs((newFaqs) => {
            setFaqs(newFaqs);
            if (newFaqs.length > 0) {
                setActiveTitle(newFaqs[0].title);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleFaq = (faqId: string) => {
        setExpandedFaqs(prev => ({
            ...prev,
            [faqId]: !prev[faqId]
        }));
    };

    if (loading) {
        return <FaqsSkelaton />;
    }

    return (
        <section className='min-h-full py-12 bg-white'>
            <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
                <FaqsHeader />

                <FaqsNavigation
                    faqs={faqs}
                    activeTitle={activeTitle}
                    onTitleClick={setActiveTitle}
                />

                <FaqsContent
                    faqs={faqs}
                    activeTitle={activeTitle}
                    expandedFaqs={expandedFaqs}
                    onToggleFaq={toggleFaq}
                />
            </div>
        </section>
    )
}
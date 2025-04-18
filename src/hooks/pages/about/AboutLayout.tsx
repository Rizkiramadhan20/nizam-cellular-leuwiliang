"use client"

import React, { useState, useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import { FetchAbout } from "@/hooks/pages/about/lib/FetchAbout"

import { AboutType } from "@/hooks/pages/about/types/About"

import AboutSkelaton from "@/hooks/pages/about/AboutSkelaton"

import dynamic from 'next/dynamic'

const AboutContent = dynamic(() => import('@/hooks/pages/about/components/AboutContent'), { ssr: false })

const AboutGallery = dynamic(() => import('@/hooks/pages/about/components/AboutGallery'), { ssr: false })

export default function AboutLayout() {
    const [about, setAbout] = useState<AboutType[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const unsubscribe = FetchAbout((newAbout) => {
            setAbout(newAbout);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <AboutSkelaton />;
    }

    return (
        <section ref={ref} className='min-h-screen py-28 md:py-32 flex justify-center items-center bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50'>
            <div className='container px-4 sm:px-6 lg:px-10'>
                <AboutContent about={about} inView={inView} />
                <AboutGallery about={about} inView={inView} />
            </div>
        </section>
    );
}

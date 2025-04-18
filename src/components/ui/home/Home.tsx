"use client"

import React, { useEffect, useState } from 'react'

import { HomeType } from "@/components/ui/home/types/Home"

import { FetchHome } from "@/components/ui/home/lib/FetchHome"

import HomeSkelaton from "@/components/ui/home/HomeSkelaton"

import dynamic from 'next/dynamic'

const BackgroundElements = dynamic(() => import('@/components/ui/home/components/BackgroundElements').then(mod => mod.BackgroundElements), { ssr: false })

const FloatingElements = dynamic(() => import('@/components/ui/home/components/FloatingElements').then(mod => mod.FloatingElements), { ssr: false })

const FeatureCards = dynamic(() => import('@/components/ui/home/components/FeatureCards').then(mod => mod.FeatureCards), { ssr: false })

const BackgroundBlobs = dynamic(() => import('@/components/ui/home/components/BackgroundBlobs').then(mod => mod.BackgroundBlobs), { ssr: false })

const HeroContent = dynamic(() => import('@/components/ui/home/components/HeroContent').then(mod => mod.HeroContent), { ssr: false })

export default function Home() {
  const [home, setHome] = useState<HomeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = FetchHome((newHome) => {
      setHome(newHome);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (home.length > 0 && home[0]?.typing?.length) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === home[0].typing.length - 1 ? 0 : prev + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [home]);

  if (loading) {
    return <HomeSkelaton />;
  }

  return (
    <section className='min-h-screen relative bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden flex items-center justify-center'>
      <BackgroundElements />
      <FloatingElements />

      <div className="container px-4 sm:px-6 lg:px-8 py-24">
        {home.map((item) => (
          <HeroContent key={item.id} item={item} currentIndex={currentIndex} />
        ))}
      </div>

      <FeatureCards />
      <BackgroundBlobs />
    </section>
  )
}

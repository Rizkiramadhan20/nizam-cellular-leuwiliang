"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { ServicesType } from '@/components/ui/services/types/Services'

import { FetchServices } from '@/components/ui/services/lib/FetchServices'

import ServicesSkelaton from '@/components/ui/services/ServicesSkelaton'

import { containerVariants, itemVariants } from '@/components/ui/services/lib/animations'

import dynamic from 'next/dynamic'

const ServicesHeader = dynamic(() => import('@/components/ui/services/components/ServicesHeader'), { ssr: false })

const ServiceCard = dynamic(() => import('@/components/ui/services/components/ServiceCard'), { ssr: false })

export default function Services() {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenServices, setHiddenServices] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = FetchServices((newServices) => {
      setServices(newServices);
      if (newServices.length > 0) {
        setHiddenServices(newServices.slice(1).map(service => service.id));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleTitleClick = (serviceId: string) => {
    if (!hiddenServices.includes(serviceId)) {
      return;
    }
    setHiddenServices(services.map(service => service.id).filter(id => id !== serviceId));
  };

  if (loading) {
    return <ServicesSkelaton />;
  }

  return (
    <section className='min-h-screen py-16 sm:py-24 relative overflow-hidden'>
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-primary/50 overflow-hidden hover:border-primary/70 hover:shadow-xl transition-all duration-300">
          <ServicesHeader />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:gap-8">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                >
                  <ServiceCard
                    service={service}
                    isHidden={hiddenServices.includes(service.id)}
                    onTitleClick={handleTitleClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


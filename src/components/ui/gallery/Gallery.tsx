"use client"

import React, { useState, useEffect } from 'react'

import { FetchGallery } from '@/components/ui/gallery/lib/FetchGallery'

import { GalleryType } from '@/components/ui/gallery/types/Gallery'

import GallerySkelaton from '@/components/ui/gallery/GallerySkelaton'

import { motion, AnimatePresence } from 'framer-motion'

import dynamic from 'next/dynamic'

const GalleryFilter = dynamic(() => import('@/components/ui/gallery/components/GalleryFilter'), { ssr: false })

const GalleryGrid = dynamic(() => import('@/components/ui/gallery/components/GalleryGrid'), { ssr: false })

const GalleryModal = dynamic(() => import('@/components/ui/gallery/components/GalleryModal'), { ssr: false })

export default function Gallery() {
    const [gallery, setGallery] = useState<GalleryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('section1');

    useEffect(() => {
        const unsubscribe = FetchGallery((newGallery) => {
            setGallery(newGallery);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <GallerySkelaton />;
    }

    // Split gallery into two sections
    const section1 = gallery.slice(0, 6);
    const section2 = gallery.slice(6, 12);

    const handleImageSelect = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        (document.getElementById('gallery_modal') as HTMLDialogElement)?.showModal();
    };

    return (
        <section className='min-h-full py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-100 via-white to-gray-100 relative'>
            <div className="container px-3 sm:px-6 lg:px-8 mx-auto">
                <GalleryFilter
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GalleryGrid
                            items={activeSection === 'section1' ? section1 : section2}
                            onImageSelect={handleImageSelect}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <GalleryModal
                selectedImage={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    )
}

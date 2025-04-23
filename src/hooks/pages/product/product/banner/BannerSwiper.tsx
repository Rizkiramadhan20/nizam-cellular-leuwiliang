"use client"

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules'
import { BannerType } from "@/hooks/pages/product/product/banner/types/Banner"

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

interface BannerSwiperProps {
    banners: BannerType[]
}

export default function BannerSwiper({ banners }: BannerSwiperProps) {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            effect="creative"
            speed={500}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: ['-20%', 0, -1],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }}
            loop={true}
            grabCursor={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[Autoplay, Pagination, Navigation, EffectCreative]}
            className="mySwiper rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl relative cursor-grab active:cursor-grabbing"
        >
            {banners.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[400px]">
                        <Image
                            src={item.imageUrl}
                            alt={`Banner image ${index + 1}`}
                            fill
                            className="object-cover"
                            quality={100}
                            priority={index === 0}
                        />
                    </div>
                </SwiperSlide>
            ))}
            <div className="swiper-button-next !w-8 !h-8 sm:!w-10 sm:!h-10 md:!w-12 md:!h-12 !bg-white/20 !backdrop-blur-sm !rounded-full after:!text-lg sm:after:!text-xl after:!text-white hover:!bg-white/30 !transition-all !duration-300" />
            <div className="swiper-button-prev !w-8 !h-8 sm:!w-10 sm:!h-10 md:!w-12 md:!h-12 !bg-white/20 !backdrop-blur-sm !rounded-full after:!text-lg sm:after:!text-xl after:!text-white hover:!bg-white/30 !transition-all !duration-300" />
            <div className="swiper-pagination !bottom-2 sm:!bottom-4" />
        </Swiper>
    )
} 
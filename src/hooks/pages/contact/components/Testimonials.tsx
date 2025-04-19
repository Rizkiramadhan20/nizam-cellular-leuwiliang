import React from 'react';

import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import { TestimonialsType } from '@/hooks/pages/contact/types/Testimonials';

import Image from 'next/image';

import StarRating from './StarRating';

interface TestimonialsProps {
    testimonials: TestimonialsType[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
        >
            <div className="w-full">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className='flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'>
                                <StarRating rating={item.rating} />
                                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">{item.message}</p>

                                <div className='flex items-center gap-3 sm:gap-4 mt-auto pt-4 sm:pt-6 border-t border-border/50 justify-center'>
                                    <div className="relative">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={500}
                                            height={500}
                                            quality={100}
                                            loading='lazy'
                                            className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300'
                                        />
                                    </div>

                                    <div>
                                        <span className="font-semibold text-foreground text-base sm:text-lg">{item.name}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default Testimonials; 
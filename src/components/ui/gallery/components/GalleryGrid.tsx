import { motion } from 'framer-motion';

import Image from 'next/image';

import { GalleryGridProps } from '@/components/ui/gallery/types/Gallery';

export default function GalleryGrid({ items, onImageSelect }: GalleryGridProps) {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="break-inside-avoid mb-3 md:mb-4 relative group cursor-pointer"
                    onClick={() => onImageSelect(item.imageUrl)}
                >
                    <motion.div
                        className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-md bg-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="relative w-full aspect-[4/3]">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                priority={index < 4}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <h3 className="text-white text-base md:text-lg font-medium line-clamp-2">
                                {item.title}
                            </h3>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
} 
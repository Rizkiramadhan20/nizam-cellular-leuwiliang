import { motion } from 'framer-motion';

import Image from 'next/image';

import { GalleryModalProps } from '@/components/ui/gallery/types/Gallery';

export default function GalleryModal({ selectedImage, onClose }: GalleryModalProps) {
    return (
        <dialog id="gallery_modal" className="modal backdrop-blur-md bg-black/50">
            <div className="modal-box max-w-6xl w-[95vw] h-[85vh] md:h-[90vh] p-0 bg-transparent border-none shadow-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden backdrop-blur-lg border bg-background border-[var(--border-color)] p-2 md:p-4"
                >
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Selected image"
                            fill
                            className="object-cover p-2 md:p-4"
                            sizes="(max-width: 1536px) 100vw, 1536px"
                            priority
                        />
                    )}
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                        <form method="dialog">
                            <button
                                className="btn btn-circle btn-ghost text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 w-8 h-8 md:w-10 md:h-10"
                                onClick={onClose}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className="cursor-default">close</button>
            </form>
        </dialog>
    );
} 
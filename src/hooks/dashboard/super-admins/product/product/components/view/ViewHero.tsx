import React from 'react';

import Image from 'next/image';

import { ViewHeroProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

const ViewHero: React.FC<ViewHeroProps> = ({ project, onClose }) => {
    return (
        <div className="relative h-64 sm:h-80 md:h-96 w-full group flex-shrink-0 overflow-hidden rounded-t-2xl">
            <Image
                src={project.imageUrl || '/placeholder.png'}
                alt={project.title}
                fill
                priority
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
                <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className={`
                                inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                                backdrop-blur-md transition-all duration-300 shadow-lg
                                ${project.status === 'publish'
                                    ? 'bg-green-100/90 text-green-700 hover:bg-green-200/90 border border-green-200/50'
                                    : 'bg-gray-100/90 text-gray-700 hover:bg-gray-200/90 border border-gray-200/50'}
                            `}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${project.status === 'publish' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                                {project.status}
                            </div>
                            <button
                                onClick={onClose}
                                className="btn btn-circle btn-sm bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
                                aria-label="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="text-white space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 drop-shadow-lg">
                            {project.title}
                        </h2>
                        {project.subtitle && (
                            <p className="text-sm sm:text-base text-gray-200 line-clamp-2 max-w-2xl">
                                {project.subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewHero; 
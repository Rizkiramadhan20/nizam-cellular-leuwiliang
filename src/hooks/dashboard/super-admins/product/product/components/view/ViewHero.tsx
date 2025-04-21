import React from 'react';
import Image from 'next/image';
import { ViewHeroProps } from './types';

const ViewHero: React.FC<ViewHeroProps> = ({ project, onClose }) => {
    return (
        <div className="relative h-64 md:h-80 w-full group flex-shrink-0">
            <Image
                src={project.imageUrl || '/placeholder.png'}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                <div className="p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <div className={`
                                inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                                backdrop-blur-md transition-all duration-300
                                ${project.status === 'publish'
                                    ? 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                                    : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'}
                            `}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${project.status === 'publish' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                {project.status}
                            </div>
                            <button
                                onClick={onClose}
                                className="btn btn-circle btn-sm bg-white/10 backdrop-blur-md border-0 hover:bg-white/20 text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewHero; 
import React, { useEffect } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { ViewModalProps } from '@/hooks/dashboard/super-admins/blog/blog/types/Blog';

export const ViewModal: React.FC<ViewModalProps> = ({ article, onClose }) => {
    useEffect(() => {
        const modal = document.getElementById('view_modal') as HTMLDialogElement | null;
        if (article) {
            modal?.showModal();
        } else {
            modal?.close();
        }
    }, [article]);

    if (!article) return null;

    return (
        <dialog id="view_modal" className="modal">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="container mx-auto min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                        {/* URL Bar */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 overflow-x-auto sm:overflow-x-hidden scrollbar-none">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                                <div className="flex-1 flex items-center px-4 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                        </svg>
                                        <span className="opacity-75 truncate">https://your-blog.com/articles/{article.slug}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                            {/* Hero Image */}
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={article.thumbnail}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            </div>

                            {/* Content Section with Glass Morphism */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Author Info with Glass Effect */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md">
                                        <Image
                                            src={article.author.photoURL}
                                            alt={article.author.name}
                                            className="w-14 h-14 rounded-full ring-2 ring-indigo-500/30"
                                            width={500}
                                            height={500}
                                        />
                                        <div>
                                            <h3 className="text-lg text-white font-medium">{article.author.name}</h3>
                                            <p className="text-sm text-gray-400 capitalize">{article.author.role}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            Description
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4 p-6 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            Content
                                        </h3>
                                        <div
                                            className="prose prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: article.content }}
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Status and Category */}
                                    <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                Status
                                            </h3>
                                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${article.status === 'published'
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                {article.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <span className="text-gray-400">Category:</span>
                                            <span className="text-gray-300">{article.category}</span>
                                        </div>
                                    </div>

                                    {/* Timestamps */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                            <p className="text-gray-400 text-sm">Created At</p>
                                            <p className="text-white mt-1">
                                                {article.createdAt.toDate().toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                            <p className="text-gray-400 text-sm">Updated At</p>
                                            <p className="text-white mt-1">
                                                {article.updatedAt.toDate().toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </dialog>
    );
}; 
import React from 'react';

import Image from 'next/image';

import { ViewSidebarProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

import { formatTimestamp } from '@/hooks/dashboard/super-admins/product/product/utils/formatTimestamp';

import ViewImages from '@/hooks/dashboard/super-admins/product/product/components/view/ViewImages';

const ViewSidebar: React.FC<ViewSidebarProps> = ({ project }) => {
    return (
        <div className="space-y-8">
            {/* Author Information */}
            <div className="bg-background rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Author
                </h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative w-16 h-16">
                        <Image
                            src={project.author?.photoURL || '/placeholder-avatar.png'}
                            alt={project.author?.name || 'Author'}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{project.author?.name}</h4>
                        <p className="text-sm text-gray-500">{project.author?.role}</p>
                    </div>
                </div>
            </div>

            {/* Product Icon */}
            {project.icon && (
                <div className="bg-background rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        Product Icon
                    </h3>
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                        <div className="relative w-full h-full">
                            <Image
                                src={project.icon}
                                alt="Product icon"
                                width={500}
                                height={500}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Product Logo */}
            {project.logo && (
                <div className="bg-background rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        Product Logo
                    </h3>
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                        <div className="relative w-full h-full">
                            <Image
                                src={project.logo}
                                alt="Product logo"
                                width={500}
                                height={500}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div className="bg-background rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Timeline
                </h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Dibuat</p>
                            <p className="text-sm text-gray-500">{formatTimestamp(project.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Terakhir Diperbarui</p>
                            <p className="text-sm text-gray-500">{formatTimestamp(project.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Images */}
            <ViewImages project={project} />
        </div>
    );
};

export default ViewSidebar; 
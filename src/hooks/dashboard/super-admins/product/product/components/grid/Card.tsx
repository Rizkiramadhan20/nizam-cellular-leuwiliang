import React from 'react';

import Image from 'next/image';

import { CardProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

export default function Card({ project, onView, onEdit, onDelete }: CardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={project.imageUrl || '/placeholder.png'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${project.status === 'publish'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                    }`}>
                    {project.status}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-4">
                {/* Title and Description */}
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {project.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">{project.stock}</p>
                        <p className="text-xs text-gray-500">Stock</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">Rp {project.price.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-gray-500">Price</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onView(project)}
                        className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onEdit(project)}
                        className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(project.id!)}
                        className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

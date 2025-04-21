import React from 'react';
import Image from 'next/image';
import { Project } from '../../types/Product';
import { formatTimestamp } from '../../utils/formatTimestamp';
import ViewImages from './ViewImages';

interface ViewSidebarProps {
    project: Project;
}

const ViewSidebar: React.FC<ViewSidebarProps> = ({ project }) => {
    return (
        <div className="space-y-8">
            {/* Author Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
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

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
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
                            <p className="text-sm font-medium text-gray-900">Created</p>
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
                            <p className="text-sm font-medium text-gray-900">Last Updated</p>
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
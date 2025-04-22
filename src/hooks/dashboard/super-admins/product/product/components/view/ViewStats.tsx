import React from 'react';

import { ViewStatsProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

const ViewStats: React.FC<ViewStatsProps> = ({ project }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 sm:p-6 bg-background rounded-2xl transition-all duration-300">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-color)] transition-all duration-300 group">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300 capitalize">
                    {project.typeCategory || 'No Category'}
                </span>
                <span className="text-sm text-gray-500 font-medium">Category</span>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-color)] transition-all duration-300 group">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300 capitalize">
                    {project.genreTitle || 'No Genre'}
                </span>
                <span className="text-sm text-gray-500 font-medium">Genre</span>
            </div>

            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-color)] transition-all duration-300 group">
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300 capitalize">
                    {project.typeTitle || 'No Type'}
                </span>
                <span className="text-sm text-gray-500 font-medium">Type</span>
            </div>
        </div>
    );
};

export default ViewStats; 
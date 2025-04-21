import React from 'react';
import { ViewStatsProps } from './types';

const ViewStats: React.FC<ViewStatsProps> = ({ project }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-900">{project.typeCategory || 'No Category'}</span>
                <span className="text-sm text-gray-500">Category</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-900">{project.typeTitle || 'No Type'}</span>
                <span className="text-sm text-gray-500">Type</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl font-bold text-gray-900">{project.genreTitle || 'No Genre'}</span>
                <span className="text-sm text-gray-500">Genre</span>
            </div>
        </div>
    );
};

export default ViewStats; 
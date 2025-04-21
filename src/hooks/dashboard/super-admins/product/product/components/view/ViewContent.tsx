import React from 'react';
import { Project } from '../../types/Product';

interface ViewContentProps {
    project: Project;
}

const ViewContent: React.FC<ViewContentProps> = ({ project }) => {
    return (
        <>
            {project.content && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Content
                    </h3>

                    <p>{project.description}</p>

                    <div
                        className="prose max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-h3:text-xl prose-h3:mb-4 prose-p:text-gray-600 prose-strong:text-gray-900 prose-em:text-gray-500 prose-em:italic prose-li:text-gray-600 prose-ol:space-y-2 prose-ul:space-y-2"
                    >
                        <div
                            className="space-y-8"
                            dangerouslySetInnerHTML={{
                                __html: project.content.replace(
                                    /<ol>/g,
                                    '<ol class="list-decimal space-y-3 pl-4">'
                                ).replace(
                                    /<li data-list="ordered">/g,
                                    '<li class="pl-2">'
                                ).replace(
                                    /<h3>/g,
                                    '<h3 class="flex items-center gap-2 pb-2 border-b border-gray-100">'
                                ).replace(
                                    /<p><em>/g,
                                    '<p class="p-4 bg-purple-50 rounded-xl italic text-purple-700 text-sm"><em>'
                                )
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewContent; 
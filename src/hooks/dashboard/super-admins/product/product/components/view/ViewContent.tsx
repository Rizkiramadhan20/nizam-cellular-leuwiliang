import React from 'react';

import { ViewContentProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

import parse from 'html-react-parser';

const ViewContent: React.FC<ViewContentProps> = ({ project }) => {
    const cleanContent = (content: string) => {
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Remove empty paragraphs
        const paragraphs = tempDiv.getElementsByTagName('p');
        Array.from(paragraphs).forEach(p => {
            if (!p.textContent?.trim()) {
                p.remove();
            }
        });

        // Remove empty headings
        const headings = tempDiv.getElementsByTagName('h3');
        Array.from(headings).forEach(h => {
            if (!h.textContent?.trim()) {
                h.remove();
            }
        });

        // Remove duplicate images (keep only the first one)
        const images = tempDiv.getElementsByTagName('img');
        const processedSrcs = new Set<string>();

        Array.from(images).forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                if (processedSrcs.has(src)) {
                    img.remove();
                } else {
                    processedSrcs.add(src);
                }
            }
        });

        // Remove elements with specific text patterns
        const allElements = tempDiv.getElementsByTagName('*');
        Array.from(allElements).forEach(el => {
            const text = el.textContent?.trim() || '';
            if (text === 'Berikutnya' || text.includes('ftd16_interactive')) {
                el.remove();
            }
        });

        return tempDiv.innerHTML;
    };

    // Check if project has content and it's not empty
    const hasContent = project.content && project.content.trim() !== '';
    const hasDescription = project.description && project.description.trim() !== '';

    return (
        <>
            {hasContent && (
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Content
                    </h3>

                    {hasDescription && (
                        <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                            {project.description}
                        </p>
                    )}

                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                        prose-headings:text-gray-900 
                        prose-p:text-gray-700 
                        prose-strong:text-gray-900 
                        prose-a:text-blue-600 hover:prose-a:text-blue-800
                        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                        prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                        prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                        prose-p:mb-4 prose-p:leading-relaxed
                        prose-li:pl-5 prose-li:text-gray-700
                        prose-ul:pl-0 prose-ul:list-none prose-ul:space-y-2 prose-ul:my-4
                        prose-ol:pl-0 prose-ol:list-none prose-ol:space-y-2 prose-ol:my-4
                        prose-li[data-list=bullet]:before:content-['•'] prose-li[data-list=bullet]:before:absolute prose-li[data-list=bullet]:before:left-0 prose-li[data-list=bullet]:before:text-purple-500 prose-li[data-list=bullet]:before:font-bold
                        prose-li[data-list=ordered]:before:absolute prose-li[data-list=ordered]:before:left-0 prose-li[data-list=ordered]:before:text-purple-600 prose-li[data-list=ordered]:before:font-semibold prose-li[data-list=ordered]:before:counter-reset prose-li[data-list=ordered]:before:content-[counter(list-item)'.']
                        prose-strong:font-semibold
                        prose-a:no-underline hover:prose-a:underline
                        [&_.ql-ui]:hidden
                        prose-img:mx-auto prose-img:w-full prose-img:max-w-3xl
                        prose-img:object-cover prose-img:aspect-video">
                        {parse(cleanContent(project.content))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewContent; 
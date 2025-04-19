import React from 'react';

interface BlogContentProps {
    content: string;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
    return (
        <div className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:flex prose-h3:items-center
            prose-p:text-gray-600 prose-p:mb-4
            prose-strong:text-gray-900
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:text-gray-600
            prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:font-medium
            [&_.feature-card]:bg-gray-50 [&_.feature-card]:p-4 [&_.feature-card]:rounded-lg [&_.feature-card]:mb-4
            [&_.feature-card>p:first-child]:font-semibold [&_.feature-card>p:first-child]:text-gray-800 [&_.feature-card>p:first-child]:flex [&_.feature-card>p:first-child]:items-center
            [&_.feature-card>p:first-child>span]:mr-2
            [&_.cta-section]:bg-blue-50 [&_.cta-section]:p-4 [&_.cta-section]:rounded-lg [&_.cta-section]:mt-6
            [&>h3>span]:mr-2
            [&>p>span]:mr-2">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}; 
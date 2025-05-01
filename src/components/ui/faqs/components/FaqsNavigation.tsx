import React from 'react';

import { FaqsNavigationProps } from "@/components/ui/faqs/types/Faqs"

export default function FaqsNavigation({ faqs, activeTitle, onTitleClick }: FaqsNavigationProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
            {faqs.map((faq) => (
                <button
                    key={faq.title}
                    onClick={() => onTitleClick(faq.title)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeTitle === faq.title
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {faq.title}
                </button>
            ))}
        </div>
    );
} 
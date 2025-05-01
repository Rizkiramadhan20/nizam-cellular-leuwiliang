import React from 'react';

import FaqItem from '@/components/ui/faqs/components/FaqItem';

import { FaqsContentProps } from "@/components/ui/faqs/types/Faqs"

export default function FaqsContent({ faqs, activeTitle, expandedFaqs, onToggleFaq }: FaqsContentProps) {
    return (
        <div className="space-y-4">
            {faqs
                .filter(item => activeTitle === item.title)
                .map((item, index) => (
                    <div key={index} className="space-y-4">
                        {item.faqs.map((faq, faqIndex) => {
                            const faqId = `${index}-${faqIndex}`;
                            const isExpanded = expandedFaqs[faqId];

                            return (
                                <FaqItem
                                    key={faqIndex}
                                    faq={faq}
                                    isExpanded={isExpanded}
                                    onToggle={() => onToggleFaq(faqId)}
                                />
                            );
                        })}
                    </div>
                ))}
        </div>
    );
} 
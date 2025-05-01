import React from 'react';

import { motion, AnimatePresence } from "framer-motion";

import { FaqItemProps } from "@/components/ui/faqs/types/Faqs"

export default function FaqItem({ faq, isExpanded, onToggle }: FaqItemProps) {
    return (
        <motion.div
            initial={false}
            className="border-b border-gray-100 last:border-0"
        >
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center py-5 text-left"
            >
                <h4 className="text-[15px] font-medium text-gray-900 pr-8">{faq.title}</h4>
                <motion.span
                    className="text-blue-600 flex-shrink-0"
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </motion.span>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-600 pb-5 text-[15px] leading-relaxed">
                            {faq.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
} 
import React from 'react'

import { motion } from 'framer-motion'

import { CategoryFilterProps } from "@/components/ui/blog/types/Blog"

export default function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
    return (
        <div className='flex items-center gap-2 sm:gap-4 mb-10 overflow-y-auto'>
            {categories.map((category, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => onCategorySelect(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-200 border-zinc-800/50 hover:border-zinc-700/50 ${selectedCategory === category
                        ? 'bg-white text-black font-medium'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                        }`}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    )
} 
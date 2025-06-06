import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { BlogCardProps } from '@/components/ui/blog/types/Blog';

import { FormatSlug } from '@/base/helper/FormatSlug';

import { motion } from 'framer-motion';

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className='block bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg'>
            <Link href={`/blog/${FormatSlug(blog.slug)}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Image
                            src={blog?.thumbnail || ''}
                            alt={blog?.title || 'Article thumbnail'}
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                        />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                        />
                    </motion.div>
                </div>

                <div className="p-4 sm:p-6">
                    <motion.div
                        className="flex items-center gap-3 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">{blog?.category}</span>
                        <time className="text-sm text-gray-400">{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true, locale: id })}</time>
                    </motion.div>

                    <motion.h3
                        className="text-xl font-semibold mb-3 text-gray-200 group-hover:text-blue-600 transition-colors line-clamp-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.3 }}
                    >
                        {blog?.title}
                    </motion.h3>

                    <motion.p
                        className="text-gray-400 mb-6 line-clamp-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.4 }}
                    >
                        {blog?.description}
                    </motion.p>

                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                            <Image
                                src={blog?.author?.photoURL}
                                alt={blog?.author?.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-sm font-medium text-gray-400">{blog?.author?.name}</span>
                            <span className="text-sm text-gray-400">{blog?.author?.role}</span>
                        </div>
                    </motion.div>
                </div>
            </Link>
        </div>
    );
}
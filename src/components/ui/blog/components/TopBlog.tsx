import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { TopBlogProps } from '@/components/ui/blog/types/Blog';

import { FormatSlug } from '@/base/helper/FormatSlug';

import { motion } from 'framer-motion';

export default function TopBlog({ blog }: TopBlogProps) {
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <Link href={`/blog/${FormatSlug(blog.slug)}`}
            className="group relative block bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <motion.div
                    className="relative h-[300px] sm:h-[400px] w-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={contentVariants}
                >
                    <Image
                        src={blog?.thumbnail || ''}
                        alt={blog?.title || 'Featured article thumbnail'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={1200}
                        height={400}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </motion.div>

                <div className="p-6 lg:p-12 flex flex-col justify-center bg-zinc-900/30">
                    <motion.div
                        className="flex items-center gap-4 mb-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                    >
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors">
                            {blog?.category}
                        </span>

                        <time className="text-sm text-zinc-400">
                            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true, locale: id })}
                        </time>
                    </motion.div>

                    <motion.h2
                        className="text-2xl lg:text-3xl font-bold mb-4 text-white leading-tight group-hover:text-orange-500/90 transition-colors duration-300 line-clamp-2 sm:line-clamp-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                    >
                        {blog?.title}
                    </motion.h2>

                    <motion.p
                        className="text-zinc-400 text-lg mb-8 line-clamp-2 sm:line-clamp-3 group-hover:text-zinc-300 transition-colors duration-300"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                    >
                        {blog?.description}
                    </motion.p>

                    <motion.div
                        className="flex items-center gap-4 mt-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-800 group-hover:ring-orange-500/50 transition-all duration-300">
                            <Image
                                src={blog?.author?.photoURL || '/default-avatar.png'}
                                alt={blog?.author?.name || 'Author'}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="font-medium text-white">{blog?.author?.name}</p>
                            <p className="text-sm text-zinc-400">{blog?.author?.role}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Link>
    );
}
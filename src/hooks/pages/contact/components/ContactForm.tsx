import React from 'react';

import { motion } from 'framer-motion';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { database } from '@/utils/firebase/firebase';

import { ref, push, set, query, orderByChild, equalTo, get } from 'firebase/database';

import { toast } from 'react-hot-toast';

const contactFormSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    socialMedia: z.string().nullable().optional(),
    profileLink: z.string().nullable().optional(),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    status: z.enum(['read', 'unread']),
}).refine((data) => {
    if (data.socialMedia && !data.profileLink) {
        return false;
    }
    return true;
}, {
    message: "Username is required when social media is selected",
    path: ["profileLink"]
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedPlatform, setSelectedPlatform] = React.useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            status: 'unread'
        }
    });

    const socialMedia = watch('socialMedia');

    React.useEffect(() => {
        setSelectedPlatform(socialMedia || '');
    }, [socialMedia]);

    const onSubmit = async (data: ContactFormData) => {
        try {
            setIsLoading(true);
            // Check if email already exists
            const emailQuery = query(
                ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_MESSAGE),
                orderByChild('email'),
                equalTo(data.email)
            );

            const snapshot = await get(emailQuery);

            if (snapshot.exists()) {
                toast.error('Email already exists. Please use a different email address.');
                setIsLoading(false);
                return;
            }

            const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_MESSAGE);
            const newContactRef = push(contactsRef);
            await set(newContactRef, {
                ...data,
                socialMedia: data.socialMedia || null,
                profileLink: data.socialMedia === 'website' ? null : (data.profileLink || null),
                timestamp: new Date().toISOString(),
            });

            toast.success('Message sent successfully!');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-2"
                >
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        {...register('fullName')}
                        placeholder="Full name"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="space-y-2"
                >
                    <label htmlFor="socialMedia" className="block text-sm font-medium text-foreground">
                        Social Media Platform
                    </label>
                    <select
                        id="socialMedia"
                        {...register('socialMedia')}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    >
                        <option value="">Select Platform</option>
                        <option value="website">Website</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                </motion.div>

                {selectedPlatform !== 'website' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="space-y-2"
                    >
                        <label htmlFor="profileLink" className="block text-sm font-medium text-foreground">
                            Username
                        </label>
                        <input
                            type="text"
                            id="profileLink"
                            {...register('profileLink')}
                            placeholder={selectedPlatform ? `Enter your ${selectedPlatform} username` : "Enter your username"}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                        />
                        {errors.profileLink && (
                            <p className="text-sm text-red-500">{errors.profileLink.message}</p>
                        )}
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="space-y-2"
                >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        placeholder="Enter your email"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="space-y-2"
                >
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                        Phone number ( with country code )
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        placeholder="+62 (000) 000-0000"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="space-y-2"
                >
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                        Your Query
                    </label>
                    <textarea
                        id="message"
                        {...register('message')}
                        rows={4}
                        placeholder="Provide any details regarding your query ..."
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-transparent border border-[var(--border-color)] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="flex items-center gap-2 sm:gap-3"
                >
                    <input
                        type="checkbox"
                        id="privacy"
                        {...register('status')}
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded border-border/50 text-primary focus:ring-primary/50 transition-all duration-200"
                    />
                    <label htmlFor="privacy" className="text-xs sm:text-sm text-muted-foreground">
                        By reaching out to us, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline transition-colors duration-200">
                            Privacy Policy
                        </a>
                        .
                    </label>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-primary text-background font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                        </div>
                    ) : (
                        'Send Message'
                    )}
                </motion.button>
            </form>
        </div>
    );
};

export default ContactForm; 
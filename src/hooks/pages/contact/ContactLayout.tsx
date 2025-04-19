"use client"

import React, { useState, useEffect, Fragment } from 'react'

import { motion } from 'framer-motion'

import { ContactType } from "@/hooks/pages/contact/types/Contact"

import { TestimonialsType } from "@/hooks/pages/contact/types/Testimonials"

import { FetchContact } from "@/hooks/pages/contact/lib/FetchContact"

import { FetchTestimonials } from "@/hooks/pages/contact/lib/FetchTestimonials"

import ContactSkelaton from "@/hooks/pages/contact/ContactSkelaton"

import dynamic from 'next/dynamic'

const ContactHeader = dynamic(() => import('@/hooks/pages/contact/components/ContactHeader'), { ssr: false })

const Testimonials = dynamic(() => import('@/hooks/pages/contact/components/Testimonials'), { ssr: false })

const ContactInfo = dynamic(() => import('@/hooks/pages/contact/components/ContactInfo'), { ssr: false })

const ContactForm = dynamic(() => import('@/hooks/pages/contact/components/ContactForm'), { ssr: false })

export default function ContactLayout() {
    const [contact, setContact] = useState<ContactType[]>([]);
    const [testimonials, setTestimonials] = useState<TestimonialsType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeContact = FetchContact((newContact) => {
            setContact(newContact);
            setLoading(false);
        });

        const unsubscribeTestimonials = FetchTestimonials((newTestimonials) => {
            setTestimonials(newTestimonials);
            setLoading(false);
        });

        return () => {
            unsubscribeContact();
            unsubscribeTestimonials();
        };
    }, []);

    if (loading) {
        return <ContactSkelaton />;
    }

    return (
        <Fragment>
            <section className='min-h-screen py-28 relative overflow-hidden bg-gradient-to-b from-background to-background/95'>
                {/* Decorative Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16 relative">
                    <ContactHeader />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12'>
                        <div className='flex flex-col gap-6 sm:gap-8'>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className='space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm shadow-sm'
                            >
                                <div className='flex items-center gap-3 sm:gap-4'>
                                    <div className='p-2.5 sm:p-3 rounded-full bg-primary/10'>
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-base sm:text-lg font-semibold text-foreground'>Quick Response</h3>
                                        <p className='text-muted-foreground text-sm sm:text-base'>Tim kami sangat berdedikasi untuk membantu pertanyaan Anda.</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 sm:gap-4'>
                                    <div className='p-2.5 sm:p-3 rounded-full bg-primary/10'>
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='text-base sm:text-lg font-semibold text-foreground'>Same Day Response</h3>
                                        <p className='text-muted-foreground text-sm sm:text-base'>Cukup kirimkan pesan &apos;hai&apos; melalui formulir dan tim kami akan menghubungi Anda di hari yang sama.</p>
                                    </div>
                                </div>
                            </motion.div>

                            <Testimonials testimonials={testimonials} />
                        </div>

                        <ContactForm />
                    </div>
                </div>
            </section>

            <section>
                {/* Decorative Elements */}
                <div className="absolute inset-0 -z-10">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    {/* Gradient Orbs */}
                    <div className="absolute top-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-400/30 rounded-full blur-3xl filter"></div>
                    <div className="absolute bottom-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-400/30 rounded-full blur-3xl filter"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-400/30 rounded-full blur-3xl filter"></div>

                    {/* Animated Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20"></div>
                </div>

                <div className='container px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-16 py-10 rounded-md relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50'>
                    <ContactInfo contact={contact} />

                    {/* Map Section */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!4v1745022062739!6m8!1m7!1sna4J83s7atDW_QL4oSzg1w!2m2!1d-6.573349245768206!2d106.6319130150776!3f90.75887!4f0!5f0.7820865974627469"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <p className="text-sm text-muted-foreground">
                By reaching out to us, you agree to our{' '}
                <a href="#" className="text-primary hover:underline transition-colors duration-200">
                    Privacy Policy
                </a>
                .
            </p>
        </Fragment>
    )
}

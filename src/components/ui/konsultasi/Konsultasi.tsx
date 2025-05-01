"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { KonsultasiType } from "@/components/ui/konsultasi/types/Konsultasi"

import { FetchKonsultasi } from "@/components/ui/konsultasi/lib/FetchKonsultasi"

import KonsultasiSkelaton from "@/components/ui/konsultasi/KonsultasiSkelaton"

import Image from "next/image"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import FormModal from "@/components/ui/konsultasi/modal/FormModal"

import { useAuth } from "@/utils/context/AuthContext"

import { useRouter } from "next/navigation"

import toast from "react-hot-toast"

export default function Konsultasi() {
  const [konsultasi, setKonsultasi] = useState<KonsultasiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = FetchKonsultasi((newKonsultasi) => {
      setKonsultasi(newKonsultasi);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFormOpen = () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk mengisi formulir");
      router.push("/signin");
      return;
    }
    setIsFormOpen(true);
  };

  if (loading) {
    return <KonsultasiSkelaton />;
  }

  return (
    <section className='min-h-full relative overflow-hidden bg-gradient-to-br from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]'>
      {/* Background Images */}
      <div className='absolute inset-0'>
        {konsultasi.map((item, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={1920}
              height={1080}
              className='absolute inset-0 w-full h-full object-cover'
              priority
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom right, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
              mixBlendMode: 'multiply'
            }}></div>
          </div>
        ))}
      </div>

      <div className="container">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column - Consultation Info */}
            <div className="bg-[rgba(0,0,0,0.6)] backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-[rgba(255,255,255,0.2)] shadow-xl hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center">
              {konsultasi.map((item, index) => (
                <div key={index} className="relative w-full flex flex-col items-center justify-center text-center">
                  <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[rgba(255,255,255,0.1)] flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                      >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
                      >
                        {item.title}
                      </motion.h1>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                      className="text-[rgba(255,255,255,0.9)] text-base sm:text-lg leading-relaxed"
                    >
                      {item.description}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                      <div className="flex flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                          className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-[rgba(var(--primary-color-rgb),0.9)] hover:bg-[rgba(var(--primary-color-rgb),1)] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[rgba(var(--primary-color-rgb),0.3)] overflow-hidden w-full sm:w-auto"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 text-[rgba(255,255,255,0.8)] text-xs sm:text-sm bg-[rgba(255,255,255,0.05)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{item.text}</span>
                          </div>
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                          onClick={handleFormOpen}
                          className="group relative inline-flex items-center gap-2 w-full sm:w-auto justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Isi Formulir
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Calendar */}
            <div className="bg-[rgba(0,0,0,0.6)] backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-[rgba(255,255,255,0.2)] shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[rgba(255,255,255,0.1)] flex items-center justify-center"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                >
                  Pilih Tanggal Konsultasi
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <style jsx global>{`
                  .react-datepicker {
                    width: 100%;
                    background: transparent !important;
                    border: none !important;
                    font-family: inherit;
                  }
                  .react-datepicker__month-container {
                    width: 100%;
                    background: transparent;
                  }
                  .react-datepicker__header {
                    background: transparent !important;
                    border-bottom: none !important;
                    padding-top: 0 !important;
                  }
                  .react-datepicker__day-name {
                    color: rgba(255, 255, 255, 0.7) !important;
                    font-weight: 500;
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    line-height: 2.5rem !important;
                    margin: 0.2rem !important;
                    font-size: 0.875rem !important;
                  }
                  .react-datepicker__day {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    line-height: 2.5rem !important;
                    margin: 0.2rem !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                    border-radius: 0.75rem !important;
                    font-size: 0.875rem !important;
                    background-color: rgba(0, 0, 0, 0.3) !important;
                  }
                  @media (min-width: 640px) {
                    .react-datepicker__day-name {
                      width: 3rem !important;
                      height: 3rem !important;
                      line-height: 3rem !important;
                      font-size: 1rem !important;
                    }
                    .react-datepicker__day {
                      width: 3rem !important;
                      height: 3rem !important;
                      line-height: 3rem !important;
                      font-size: 1rem !important;
                    }
                  }
                  .react-datepicker__day:hover {
                    background-color: rgba(255, 255, 255, 0.15) !important;
                  }
                  .react-datepicker__day--selected {
                    background-color: var(--primary) !important;
                    font-weight: bold;
                    color: white !important;
                  }
                  .react-datepicker__day--today {
                    border: 2px solid var(--primary) !important;
                    font-weight: bold !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                    background-color: transparent !important;
                  }
                  .react-datepicker__day--today:hover {
                    background-color: rgba(var(--primary-color-rgb), 0.2) !important;
                    opacity: 0.8 !important;
                    color: white !important;
                  }
                  .react-datepicker__day--today.react-datepicker__day--selected {
                    background-color: var(--primary) !important;
                    border: none !important;
                    color: white !important;
                  }
                  .react-datepicker__day--keyboard-selected {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                  }
                  .react-datepicker__day--outside-month {
                    color: rgba(255, 255, 255, 0.4) !important;
                    background-color: rgba(0, 0, 0, 0.2) !important;
                  }
                  .react-datepicker__current-month {
                    color: rgba(255, 255, 255, 1) !important;
                    font-size: 1.25rem !important;
                    font-weight: 600 !important;
                    margin-bottom: 0.75rem !important;
                  }
                  @media (min-width: 640px) {
                    .react-datepicker__current-month {
                      font-size: 1.5rem !important;
                      margin-bottom: 1rem !important;
                    }
                  }
                  .react-datepicker__navigation-icon::before {
                    border-color: rgba(255, 255, 255, 0.9) !important;
                    border-width: 2px !important;
                  }
                  .react-datepicker__navigation:hover *::before {
                    border-color: rgba(var(--primary-color-rgb), 1) !important;
                  }
                `}</style>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                  className="w-full"
                  calendarClassName="!bg-transparent"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="flex items-center justify-between px-2 py-3 sm:py-4">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="p-1.5 sm:p-2 rounded-xl hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 disabled:opacity-40"
                        aria-label="Previous month"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-white font-semibold text-lg sm:text-xl">
                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="p-1.5 sm:p-2 rounded-xl hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 disabled:opacity-40"
                        aria-label="Next month"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedDate={selectedDate}
      />
    </section>
  )
}

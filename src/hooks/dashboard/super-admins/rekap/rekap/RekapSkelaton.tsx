import React from 'react'

export default function RekapSkelaton() {
    return (
        <section className="space-y-6">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        <div className="h-3 w-20 bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="h-[400px] bg-gray-100 rounded-lg animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="h-[400px] bg-gray-100 rounded-lg animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Latest Piutang Data Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="card bg-base-100 shadow-sm">
                            <div className="card-body p-4">
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i}>
                                            <div className="h-3 w-16 bg-gray-200 rounded-lg animate-pulse mb-1 relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            </div>
                                            <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
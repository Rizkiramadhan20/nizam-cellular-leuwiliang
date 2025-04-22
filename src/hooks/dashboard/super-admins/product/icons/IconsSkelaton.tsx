import React from 'react'

export default function ProductSkelaton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                    >
                        {/* Image Skeleton */}
                        <div className="relative h-[300px] w-full bg-gray-50">
                            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
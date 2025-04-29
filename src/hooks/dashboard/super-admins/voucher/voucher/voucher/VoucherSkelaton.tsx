import React from 'react'

export default function ProductSkelaton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                        {/* Image Skeleton */}
                        <div className="relative h-48 bg-gray-200 animate-pulse" />

                        {/* Content Skeleton */}
                        <div className="p-5 space-y-4">
                            <div className="space-y-2">
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-4 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
                            </div>

                            {/* Stats Skeleton */}
                            <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100">
                                <div className="text-center">
                                    <div className="h-5 w-12 bg-gray-200 rounded-lg animate-pulse mx-auto" />
                                    <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse mx-auto mt-1" />
                                </div>
                                <div className="text-center">
                                    <div className="h-5 w-16 bg-gray-200 rounded-lg animate-pulse mx-auto" />
                                    <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse mx-auto mt-1" />
                                </div>
                            </div>

                            {/* Actions Skeleton */}
                            <div className="flex items-center justify-end gap-2">
                                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
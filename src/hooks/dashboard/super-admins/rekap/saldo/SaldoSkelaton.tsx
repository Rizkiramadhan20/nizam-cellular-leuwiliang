import React from 'react'

export default function SaldoSkelaton() {
    return (
        <section>
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Search and Filter Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
                </div>
                <div className="mt-4 h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                {[...Array(9)].map((_, index) => (
                                    <th key={index} className="px-6 py-3">
                                        <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[...Array(5)].map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {[...Array(9)].map((_, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4">
                                            <div className="h-4 w-20 bg-gray-200 rounded-lg animate-pulse" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-6 flex justify-center">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    )
}
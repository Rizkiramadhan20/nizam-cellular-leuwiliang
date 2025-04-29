import React from 'react';

import { format } from 'date-fns';

import { HandphoneTableProps } from '@/hooks/dashboard/super-admins/handphone/handphone/types/handphone';

import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

export default function HandphoneTable({
    handphones,
    onEdit,
    onDelete,
    currentPage = 1,
    itemsPerPage = 10,
    totalValue = 0,
    totalStock = 0
}: HandphoneTableProps) {
    const formatDate = (date: Date) => {
        return date ? format(new Date(date), 'dd/MMMM/yyyy') : 'N/A';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Calculate the starting number for the current page
    const getRowNumber = (index: number) => {
        return (currentPage - 1) * itemsPerPage + index + 1;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Merek
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pemilik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Harga
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal Dibuat
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {handphones.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="px-6 py-4 text-center text-sm text-gray-500">
                                No handphones found. Add one to get started.
                            </td>
                        </tr>
                    ) : (
                        <>
                            {handphones.map((handphone, index) => (
                                <tr key={handphone.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getRowNumber(index)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {handphone.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {handphone.description || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {handphone.brand}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {handphone.owner}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${handphone.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {handphone.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatPrice(handphone.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                        {formatPrice(handphone.total || handphone.stock * handphone.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(handphone.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(handphone)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                                title="Edit"
                                            >
                                                <RiEdit2Line size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(handphone.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                                                title="Delete"
                                            >
                                                <RiDeleteBinLine size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}

                    <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                        <td colSpan={5} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                            Total Stock:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {totalStock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Total Value:
                        </td>
                        <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700">
                            {formatPrice(totalValue)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
} 
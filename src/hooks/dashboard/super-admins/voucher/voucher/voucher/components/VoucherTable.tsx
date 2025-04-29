import React from 'react';

import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

import { VoucherTableProps } from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/types/voucher';

export default function VoucherTable({ vouchers, onEdit, onDelete }: VoucherTableProps) {
    const formatDate = (date: Date) => {
        return date ? new Date(date).toLocaleDateString() : 'N/A';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Calculate total value of all handphones
    const totalValue = vouchers.reduce((sum, voucher) => {
        return sum + (voucher.total || voucher.stock * voucher.price);
    }, 0);

    // Calculate total stock
    const totalStock = vouchers.reduce((sum, voucher) => {
        return sum + voucher.stock;
    }, 0);

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Provider
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
                            Dibuat pada
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vouchers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                No vouchers found. Add one to get started.
                            </td>
                        </tr>
                    ) : (
                        <>
                            {vouchers.map((voucher) => (
                                <tr key={voucher.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {voucher.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {voucher.brand}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${voucher.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {voucher.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatPrice(voucher.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                        {formatPrice(voucher.total || voucher.stock * voucher.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(voucher.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={() => onEdit(voucher)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                                                title="Edit"
                                            >
                                                <RiEdit2Line className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(voucher.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                                title="Delete"
                                            >
                                                <RiDeleteBinLine className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
                <tfoot className="bg-gray-50">
                    <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Totals:
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {totalStock}
                        </td>
                        <td colSpan={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {formatPrice(totalValue)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
} 
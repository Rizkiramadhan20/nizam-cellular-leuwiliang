import React from 'react';

import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

import { Kartu } from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/types/Kartu';

interface KartuTableProps {
    kartus: Kartu[];
    onEdit: (handphone: Kartu) => void;
    onDelete: (id: string) => void;
}

export default function HandphoneTable({ kartus, onEdit, onDelete }: KartuTableProps) {
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

    // Ensure kartus is an array before using reduce
    const safeKartus = kartus || [];

    // Calculate total value of all kartus
    const totalValue = safeKartus.reduce((sum, kartu) => {
        return sum + (kartu.total || kartu.stock * kartu.price);
    }, 0);

    // Calculate total stock
    const totalStock = safeKartus.reduce((sum, kartu) => {
        return sum + kartu.stock;
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
                            Brand
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
                    {safeKartus.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                Tidak ditemukan kartu perdana. Tambahkan satu untuk memulai.
                            </td>
                        </tr>
                    ) : (
                        <>
                            {safeKartus.map((kartu) => (
                                <tr key={kartu.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {kartu.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {kartu.brand}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${kartu.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {kartu.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatPrice(kartu.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                        {formatPrice(kartu.total || kartu.stock * kartu.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(kartu.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={() => onEdit(kartu)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                                                title="Edit"
                                            >
                                                <RiEdit2Line className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(kartu.id)}
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
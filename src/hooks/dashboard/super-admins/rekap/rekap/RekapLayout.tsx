"use client"

import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Scale,
    ChartOptions,
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

import { useUangLaciData } from '@/hooks/dashboard/super-admins/rekap/uang-laci/lib/FetchUangLaci';

import { useSaldoData } from '@/hooks/dashboard/super-admins/rekap/saldo/lib/FetchSaldo';

import { usePiutangData } from '@/hooks/dashboard/super-admins/rekap/piutang/lib/FetchPiutang';

import { FormatRupiah } from '@/base/helper/FormatRupiah';

import { formatDateToMonthName } from '@/base/helper/FormatDate';

import RekapSkelaton from '@/hooks/dashboard/super-admins/rekap/rekap/RekapSkelaton';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function RekapLayout() {
    const { contents: uangLaciContents, isLoading: isUangLaciLoading } = useUangLaciData();
    const { contents: saldoContents, isLoading: isSaldoLoading } = useSaldoData();
    const { contents: piutangContents, isLoading: isPiutangLoading } = usePiutangData();

    if (isUangLaciLoading || isSaldoLoading || isPiutangLoading) {
        return <RekapSkelaton />;
    }

    const latestUangLaci = [...uangLaciContents].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const latestSaldo = [...saldoContents].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const totalProfit = uangLaciContents.reduce((sum, content) => sum + Number(content.UangLaba), 0);
    const totalPiutang = piutangContents.reduce((sum, content) => sum + Number(content.price), 0);

    const sortedUangLaci = [...uangLaciContents].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const incomeChartData = {
        labels: sortedUangLaci.map(content => formatDateToMonthName(content.date)),
        datasets: [
            {
                label: 'Uang Laci',
                data: sortedUangLaci.map(content => Number(content.pendapatan)),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Laba',
                data: sortedUangLaci.map(content => Number(content.UangLaba)),
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const incomeChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    callback: function (this: Scale, tickValue: number | string) {
                        if (typeof tickValue === 'number') {
                            return 'Rp ' + tickValue.toLocaleString('id-ID');
                        }
                        return tickValue;
                    }
                }
            }
        }
    };

    // Prepare data for piutang status chart
    const piutangStatusData = {
        labels: ['Sudah Bayar', 'Belum Bayar'],
        datasets: [
            {
                data: [
                    piutangContents.filter(p => p.status === 'sudah_bayar').length,
                    piutangContents.filter(p => p.status === 'belum_bayar').length
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const piutangChartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <section className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-white border border-[var(--border-color)]">
                    <div className="card-body">
                        <h3 className="card-title text-sm font-medium text-gray-600">Uang Laci</h3>
                        <p className="text-2xl font-bold text-indigo-600">
                            {latestUangLaci ? FormatRupiah(latestUangLaci.pendapatan) : 'Rp 0'}
                        </p>
                        <p className="text-xs text-gray-500">
                            {latestUangLaci ? formatDateToMonthName(latestUangLaci.date) : 'Tidak ada data'}
                        </p>
                    </div>
                </div>
                <div className="card bg-white border border-[var(--border-color)]">
                    <div className="card-body">
                        <h3 className="card-title text-sm font-medium text-gray-600">Total Laba</h3>
                        <p className="text-2xl font-bold text-emerald-600">{FormatRupiah(totalProfit.toString())}</p>
                        <p className="text-xs text-gray-500">
                            {latestUangLaci ? formatDateToMonthName(latestUangLaci.date) : 'Tidak ada data'}
                        </p>
                    </div>
                </div>
                <div className="card bg-white border border-[var(--border-color)]">
                    <div className="card-body">
                        <h3 className="card-title text-sm font-medium text-gray-600">Saldo</h3>
                        <p className="text-2xl font-bold text-blue-600">
                            {latestSaldo ? FormatRupiah(latestSaldo.saldo) : 'Rp 0'}
                        </p>
                        <p className="text-xs text-gray-500">
                            {latestSaldo ? formatDateToMonthName(latestSaldo.date) : 'Tidak ada data'}
                        </p>
                    </div>
                </div>
                <div className="card bg-white border border-[var(--border-color)]">
                    <div className="card-body">
                        <h3 className="card-title text-sm font-medium text-gray-600">Total Piutang</h3>
                        <p className="text-2xl font-bold text-red-600">{FormatRupiah(totalPiutang.toString())}</p>
                        <p className="text-xs text-gray-500">
                            {piutangContents.length > 0 ? formatDateToMonthName(piutangContents[0].date) : 'Tidak ada data'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6">
                    <div className="h-[400px]">
                        <Line data={incomeChartData} options={incomeChartOptions} />
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6">
                    <div className="h-[400px]">
                        <Doughnut data={piutangStatusData} options={piutangChartOptions} />
                    </div>
                </div>
            </div>

            {/* Latest Piutang Data */}
            <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Piutang Terbaru</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {piutangContents
                        .filter(piutang => piutang.createdAt)
                        .sort((a, b) => {
                            const dateA = new Date(a.createdAt as unknown as string);
                            const dateB = new Date(b.createdAt as unknown as string);
                            return dateB.getTime() - dateA.getTime();
                        })
                        .slice(0, 4)
                        .map((piutang, index) => (
                            <div key={index} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="card-body p-4">
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-200">Nama</p>
                                            <p className="text-lg font-semibold text-gray-200">{piutang.nama}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-200">Jumlah</p>
                                            <p className="text-lg font-semibold text-gray-200">
                                                {FormatRupiah(piutang.price)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-200">Tanggal</p>
                                            <p className="text-sm text-gray-200">
                                                {formatDateToMonthName(piutang.date)}
                                            </p>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <p className="text-sm font-medium text-gray-200">Status</p>
                                            <div className={`badge ${piutang.status === 'belum_bayar' ? 'badge-error' : 'badge-success'}`}>
                                                {piutang.status === 'belum_bayar' ? 'Belum Bayar' : 'Sudah Bayar'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}

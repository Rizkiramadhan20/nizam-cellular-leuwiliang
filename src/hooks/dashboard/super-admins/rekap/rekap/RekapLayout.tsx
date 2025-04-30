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

import { useUangLaciData } from '../uang-laci/lib/FetchUangLaci';

import { useSaldoData } from '../saldo/lib/FetchSaldo';

import { usePiutangData } from '../piutang/lib/FetchPiutang';

import { FormatRupiah } from '@/base/helper/FormatRupiah';

import { formatDateToMonthName } from '@/base/helper/FormatDate';

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
    const { contents: uangLaciContents } = useUangLaciData();
    const { contents: saldoContents } = useSaldoData();
    const { contents: piutangContents } = usePiutangData();

    // Calculate total income and profit
    const totalIncome = uangLaciContents.reduce((sum, content) => sum + Number(content.pendapatan), 0);
    const totalProfit = uangLaciContents.reduce((sum, content) => sum + Number(content.UangLaba), 0);
    const totalSaldo = saldoContents.reduce((sum, content) => sum + Number(content.saldo), 0);
    const totalPiutang = piutangContents.reduce((sum, content) => sum + Number(content.price), 0);

    // Prepare data for income and profit chart
    const sortedUangLaci = [...uangLaciContents].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const incomeChartData = {
        labels: sortedUangLaci.map(content => formatDateToMonthName(content.date)),
        datasets: [
            {
                label: 'Pendapatan',
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
                display: true,
                text: 'Grafik Pendapatan dan Laba',
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
                display: true,
                text: 'Status Piutang',
            },
        },
    };

    return (
        <section className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Rekap</h1>
                <p className="text-gray-600">Ringkasan data keuangan dan piutang</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Pendapatan</h3>
                    <p className="text-2xl font-bold text-indigo-600">{FormatRupiah(totalIncome.toString())}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Laba</h3>
                    <p className="text-2xl font-bold text-green-600">{FormatRupiah(totalProfit.toString())}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Saldo</h3>
                    <p className="text-2xl font-bold text-blue-600">{FormatRupiah(totalSaldo.toString())}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Piutang</h3>
                    <p className="text-2xl font-bold text-red-600">{FormatRupiah(totalPiutang.toString())}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="h-[400px]">
                        <Line data={incomeChartData} options={incomeChartOptions} />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="h-[400px]">
                        <Doughnut data={piutangStatusData} options={piutangChartOptions} />
                    </div>
                </div>
            </div>
        </section>
    );
}

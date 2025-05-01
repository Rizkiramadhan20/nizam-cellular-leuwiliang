import React, { useState, useEffect } from 'react';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date | null;
}

export default function FormModal({ isOpen, onClose, selectedDate }: FormModalProps) {
    const [formData, setFormData] = useState({
        // Data Pelanggan
        nama: '',
        nomorHp: '',
        alamat: '',

        // Data Perangkat
        merekTipeHp: '',
        nomorImei: '',
        warna: '',
        aksesori: '',
        statusGaransi: '',

        // Keluhan
        keluhan: '',

        // Pemeriksaan Awal
        cekFisik: '',
        bisaRecovery: '',
        bisaHidup: '',
        dikenaliKomputer: '',
        estimasiPenyebab: '',

        // Estimasi Biaya & Waktu
        biayaPerbaikan: '',
        ongkosJasa: '',
        biayaSparePart: '',
        waktuPengerjaan: '',
        konfirmasiBiaya: '',

        // Persetujuan
        setujuPerbaikan: '',
        tandaTangan: '',
        tanggal: '',

        // Catatan Tambahan
        backupData: '',
        resikoDataDijelaskan: '',
        resetPabrik: '',
        nomorServis: '',

        // Setelah Perbaikan
        hasilPerbaikan: '',
        kondisiHp: '',
        garansiServis: '',
        konfirmasiPelanggan: ''
    });

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                tanggal: formattedDate
            }));
        }
    }, [selectedDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    if (!isOpen) return null;

    return (
        <dialog id="form_modal" className="modal" open={isOpen}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full">
                    <div className="mockup-browser border border-[var(--border-color)]">
                        <div className="mockup-browser-toolbar">
                        </div>
                        <div className="flex flex-col gap-4 p-4 max-h-[80vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-center">Formulir Penerimaan Konsultasi</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Data Pelanggan */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">1. Data Pelanggan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Nama</span>
                                            </label>

                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.nama}
                                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Nomor HP</span>
                                            </label>
                                            <input
                                                type="tel"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.nomorHp}
                                                onChange={(e) => setFormData({ ...formData, nomorHp: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control flex flex-col gap-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Alamat (opsional)</span>
                                        </label>

                                        <textarea
                                            className="textarea textarea-bordered border border-[var(--border-color)] bg-transparent w-full resize-none"
                                            value={formData.alamat}
                                            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Data Perangkat */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">2. Data Perangkat</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Merek dan Tipe HP</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.merekTipeHp}
                                                onChange={(e) => setFormData({ ...formData, merekTipeHp: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Warna</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.warna}
                                                onChange={(e) => setFormData({ ...formData, warna: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Aksesori yang dibawa</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                placeholder="contoh: charger, casing, SIM, memori"
                                                value={formData.aksesori}
                                                onChange={(e) => setFormData({ ...formData, aksesori: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Status Garansi</span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.statusGaransi}
                                                onChange={(e) => setFormData({ ...formData, statusGaransi: e.target.value })}
                                            >
                                                <option value="">Pilih Status</option>
                                                <option value="masih">Masih dalam garansi</option>
                                                <option value="lewat">Sudah lewat</option>
                                                <option value="tidak-tahu">Tidak diketahui</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Keluhan */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4 w-full">
                                    <h3 className="text-lg font-semibold mb-4">3. Keluhan / Masalah yang Dialami</h3>

                                    <div className="form-control w-full">
                                        <textarea
                                            className="textarea textarea-bordered h-32 border border-[var(--border-color)] bg-transparent w-full resize-none"
                                            placeholder="Contoh: Tidak bisa menyala, Layar pecah, Tidak bisa dicas, Sering mati sendiri, Sinyal hilang, Suara tidak keluar, HP bootloop / stuck logo"
                                            value={formData.keluhan}
                                            onChange={(e) => setFormData({ ...formData, keluhan: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Pemeriksaan Awal */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">4. Pemeriksaan Awal</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Apakah perangkat bisa dihidupkan?</span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.bisaHidup}
                                                onChange={(e) => setFormData({ ...formData, bisaHidup: e.target.value })}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="ya">Ya</option>
                                                <option value="tidak">Tidak</option>
                                            </select>
                                        </div>

                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Apakah perangkat dikenali oleh komputer?</span>
                                            </label>

                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.dikenaliKomputer}
                                                onChange={(e) => setFormData({ ...formData, dikenaliKomputer: e.target.value })}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="ya">Ya</option>
                                                <option value="tidak">Tidak</option>
                                            </select>
                                        </div>

                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Cek fisik perangkat</span>
                                            </label>

                                            <textarea
                                                className="textarea textarea-bordered border border-[var(--border-color)] bg-transparent w-full resize-none"
                                                placeholder="Cek kondisi layar, baterai, port USB, tombol, dll."
                                                value={formData.cekFisik}
                                                onChange={(e) => setFormData({ ...formData, cekFisik: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Estimasi penyebab awal (jika bisa disimpulkan)</span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered border border-[var(--border-color)] bg-transparent w-full resize-none"
                                                value={formData.estimasiPenyebab}
                                                onChange={(e) => setFormData({ ...formData, estimasiPenyebab: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Estimasi Biaya & Waktu */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">5. Estimasi Biaya & Waktu</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Biaya perbaikan</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.biayaPerbaikan}
                                                onChange={(e) => setFormData({ ...formData, biayaPerbaikan: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Ongkos jasa</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.ongkosJasa}
                                                onChange={(e) => setFormData({ ...formData, ongkosJasa: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Biaya spare part (jika ada)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.biayaSparePart}
                                                onChange={(e) => setFormData({ ...formData, biayaSparePart: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Waktu pengerjaan estimasi</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                placeholder="___ hari/jam"
                                                value={formData.waktuPengerjaan}
                                                onChange={(e) => setFormData({ ...formData, waktuPengerjaan: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Persetujuan Pelanggan */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">6. Persetujuan Pelanggan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Pelanggan menyetujui proses perbaikan?</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="setujuPerbaikan"
                                                        value="ya"
                                                        checked={formData.setujuPerbaikan === "ya"}
                                                        onChange={(e) => setFormData({ ...formData, setujuPerbaikan: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Ya"
                                                    />
                                                    <span>Ya</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="setujuPerbaikan"
                                                        value="tidak"
                                                        checked={formData.setujuPerbaikan === "tidak"}
                                                        onChange={(e) => setFormData({ ...formData, setujuPerbaikan: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Tidak"
                                                    />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Tanggal</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.tanggal}
                                                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Catatan Tambahan */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">7. Catatan Tambahan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Backup data (jika memungkinkan)</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="backupData"
                                                        value="ya"
                                                        checked={formData.backupData === "ya"}
                                                        onChange={(e) => setFormData({ ...formData, backupData: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Ya"
                                                    />
                                                    <span>Ya</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="backupData"
                                                        value="tidak"
                                                        checked={formData.backupData === "tidak"}
                                                        onChange={(e) => setFormData({ ...formData, backupData: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Tidak"
                                                    />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Resiko kehilangan data dijelaskan</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="resikoDataDijelaskan"
                                                        value="ya"
                                                        checked={formData.resikoDataDijelaskan === "ya"}
                                                        onChange={(e) => setFormData({ ...formData, resikoDataDijelaskan: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Ya"
                                                    />
                                                    <span>Ya</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="resikoDataDijelaskan"
                                                        value="tidak"
                                                        checked={formData.resikoDataDijelaskan === "tidak"}
                                                        onChange={(e) => setFormData({ ...formData, resikoDataDijelaskan: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Tidak"
                                                    />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">HP akan di-reset pabrik?</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="resetPabrik"
                                                        value="ya"
                                                        checked={formData.resetPabrik === "ya"}
                                                        onChange={(e) => setFormData({ ...formData, resetPabrik: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Ya"
                                                    />
                                                    <span>Ya</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="resetPabrik"
                                                        value="tidak"
                                                        checked={formData.resetPabrik === "tidak"}
                                                        onChange={(e) => setFormData({ ...formData, resetPabrik: e.target.value })}
                                                        className="radio radio-primary"
                                                        aria-label="Tidak"
                                                    />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Nomor servis / invoice</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.nomorServis}
                                                onChange={(e) => setFormData({ ...formData, nomorServis: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Setelah Perbaikan */}
                                <div className="bg-background border border-[var(--border-color)] p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">8. Setelah Perbaikan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Hasil perbaikan</span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.hasilPerbaikan}
                                                onChange={(e) => setFormData({ ...formData, hasilPerbaikan: e.target.value })}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="selesai">Selesai</option>
                                                <option value="tidak-bisa">Tidak bisa diperbaiki</option>
                                                <option value="ganti-unit">Ganti unit</option>
                                            </select>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">HP dikembalikan dalam kondisi</span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.kondisiHp}
                                                onChange={(e) => setFormData({ ...formData, kondisiHp: e.target.value })}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="normal">Normal</option>
                                                <option value="cacat">Ada cacat</option>
                                                <option value="tidak-selesai">Tidak selesai</option>
                                            </select>
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Garansi servis</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                placeholder="___ hari/bulan"
                                                value={formData.garansiServis}
                                                onChange={(e) => setFormData({ ...formData, garansiServis: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control flex flex-col gap-2">
                                            <label className="label">
                                                <span className="label-text">Konfirmasi pelanggan</span>
                                            </label>
                                            <select
                                                className="select select-bordered w-full border border-[var(--border-color)] bg-transparent"
                                                value={formData.konfirmasiPelanggan}
                                                onChange={(e) => setFormData({ ...formData, konfirmasiPelanggan: e.target.value })}
                                            >
                                                <option value="">Pilih</option>
                                                <option value="puas">Puas</option>
                                                <option value="tidak-puas">Tidak puas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button type="button" onClick={onClose} className="btn btn-ghost">
                                        Batal
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
} 
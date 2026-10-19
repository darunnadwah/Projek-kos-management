import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PesanFlash from '@/Components/PesanFlash';
import Kosong from '@/Components/Kosong';
import BarisRental from '@/Components/Rentals/BarisRental';
import RentalStatus from '@/Components/Rentals/RentalStatus';

export default function Index({ rentals }) {
    const rentalList = rentals?.data || rentals || [];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Head title="Daftar Penyewaan" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Data Transaksi Penyewaan</h1>
                <Link href="/rentals/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    + Tambah Penyewaan
                </Link>
            </div>

            {/* Umpan Balik Flash Message */}
            <PesanFlash />

            {/* Umpan Balik Keadaan Kosong */}
            {rentalList.length === 0 ? (
                <Kosong
                    pesan="Belum ada transaksi penyewaan yang terdaftar."
                    aksi="Buat Penyewaan Baru"
                    urlTambah="/rentals/create"
                />
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden border">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-3 font-semibold text-gray-700">Penyewa</th>
                                <th className="p-3 font-semibold text-gray-700">Kamar</th>
                                <th className="p-3 font-semibold text-gray-700">Periode Sewa</th>
                                <th className="p-3 font-semibold text-gray-700">Total Harga</th>
                                <th className="p-3 font-semibold text-gray-700">Status</th>
                                <th className="p-3 font-semibold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentalList.map((rental) => (
                                <BarisRental key={rental.id} rental={rental} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
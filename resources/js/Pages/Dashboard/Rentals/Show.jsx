import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ rental }) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Detail Penyewaan" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Detail Penyewaan</h1>
                <Link href="/rentals" className="bg-gray-300 px-4 py-2 rounded">
                    Kembali
                </Link>
            </div>

            <div className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID Penyewaan:</span>
                    <span className="text-gray-900">{rental.id}</span>
                </div>
                
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID User:</span>
                    <span className="text-gray-900">{rental.user_id}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID Kamar:</span>
                    <span className="text-gray-900">{rental.room_id}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Total Harga:</span>
                    <span className="text-gray-900">Rp {rental.total_price}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Status Pembayaran:</span>
                    <span className="text-gray-900">{rental.payment_status}</span>
                </div>
            </div>
        </div>
    );
}
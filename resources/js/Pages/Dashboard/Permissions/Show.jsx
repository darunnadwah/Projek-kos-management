import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ permission }) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Detail Permission" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Detail Permission / Laporan</h1>
                <Link href="/permissions" className="bg-gray-300 px-4 py-2 rounded">
                    Kembali
                </Link>
            </div>

            <div className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID:</span>
                    <span className="text-gray-900">{permission.id}</span>
                </div>
                
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID User:</span>
                    <span className="text-gray-900">{permission.user_id}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Tipe:</span>
                    <span className="text-gray-900 font-semibold">{permission.type}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Deskripsi:</span>
                    <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded">{permission.description}</p>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Status:</span>
                    <span className="text-gray-900">{permission.status}</span>
                </div>
            </div>
        </div>
    );
}
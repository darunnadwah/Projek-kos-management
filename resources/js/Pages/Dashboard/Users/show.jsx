import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Detail Pengguna" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Detail Pengguna</h1>
                <Link href="/users" className="bg-gray-300 px-4 py-2 rounded">
                    Kembali
                </Link>
            </div>

            <div className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID:</span>
                    <span className="text-gray-900">{user.id}</span>
                </div>
                
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Nama:</span>
                    <span className="text-gray-900">{user.name}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Email:</span>
                    <span className="text-gray-900">{user.email}</span>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <div>Dibuat pada: {new Date(user.created_at).toLocaleString('id-ID')}</div>
                </div>
            </div>
        </div>
    );
}
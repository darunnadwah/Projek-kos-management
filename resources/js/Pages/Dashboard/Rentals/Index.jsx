import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ rentals, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data penyewaan ini?')) {
            destroy(`/rentals/${id}`);
        }
    };

    return (
        <div className="p-6">
            <Head title="Daftar Penyewaan" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Penyewaan</h1>
                <Link href="/rentals/create" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Tambah Penyewaan
                </Link>
            </div>

            {flash?.success && (
                <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                    {flash.success}
                </div>
            )}

            <table className="w-full bg-white shadow-md rounded overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">ID User</th>
                        <th className="p-3 text-left">ID Kamar</th>
                        <th className="p-3 text-left">Total Harga</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {!rentals || !rentals.data || rentals.data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-3 text-center text-gray-500">Belum ada data penyewaan.</td>
                        </tr>
                    ) : (
                        rentals.data.map((rental) => (
                            <tr key={rental.id} className="border-b">
                                <td className="p-3">{rental.user_id}</td>
                                <td className="p-3">{rental.room_id}</td>
                                <td className="p-3">Rp {rental.total_price}</td>
                                <td className="p-3">{rental.payment_status}</td>
                                <td className="p-3">
                                    <Link href={`/rentals/${rental.id}`} className="text-green-600 mr-3">Detail</Link>
                                    <Link href={`/rentals/${rental.id}/edit`} className="text-blue-500 mr-3">Ubah</Link>
                                    <button onClick={() => handleDelete(rental.id)} className="text-red-500">Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ permissions, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data izin/laporan ini?')) {
            destroy(`/permissions/${id}`);
        }
    };

    return (
        <div className="p-6">
            <Head title="Daftar Permission" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Permission & Laporan</h1>
                <Link href="/permissions/create" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Buat Izin / Laporan
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
                        <th className="p-3 text-left">Tipe</th>
                        <th className="p-3 text-left">Deskripsi</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {!permissions || !permissions.data || permissions.data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-3 text-center text-gray-500">Belum ada data permission.</td>
                        </tr>
                    ) : (
                        permissions.data.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{item.user_id}</td>
                                <td className="p-3 font-semibold">{item.type}</td>
                                <td className="p-3">{item.description}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs ${item.status === 'approved' ? 'bg-green-100 text-green-800' : item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <Link href={`/permissions/${item.id}`} className="text-green-600 mr-3">Detail</Link>
                                    <Link href={`/permissions/${item.id}/edit`} className="text-blue-500 mr-3">Ubah</Link>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-500">Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ users, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            destroy(`/users/${id}`);
        }
    };

    return (
        <div className="p-6">
            <Head title="Daftar Pengguna" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Pengguna</h1>
                <Link href="/users/create" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Tambah Pengguna
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
                        <th className="p-3 text-left">Nama</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {!users || !users.data || users.data.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="p-3 text-center text-gray-500">Belum ada data pengguna.</td>
                        </tr>
                    ) : (
                        users.data.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <Link href={`/users/${user.id}`} className="text-green-600 mr-3">Detail</Link>
                                    <Link href={`/users/${user.id}/edit`} className="text-blue-500 mr-3">Ubah</Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500">Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
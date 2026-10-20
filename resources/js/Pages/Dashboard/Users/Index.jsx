import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PesanFlash from '@/Components/PesanFlash';
import Kosong from '@/Components/Kosong';
import BarisUser from '@/Components/Users/BarisUser';

export default function Index({ users }) {
    const userList = users?.data || users || [];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Head title="Manajemen Pengguna" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Data Pengguna & Peran</h1>
                <Link href="/users/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    + Tambah Pengguna
                </Link>
            </div>

            <PesanFlash />

            {userList.length === 0 ? (
                <Kosong
                    pesan="Belum ada data pengguna yang terdaftar."
                    aksi="Tambah Pengguna Baru"
                    urlTambah="/users/create"
                />
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden border">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-3 font-semibold text-gray-700">Nama</th>
                                <th className="p-3 font-semibold text-gray-700">Email</th>
                                <th className="p-3 font-semibold text-gray-700">Peran (Role)</th>
                                <th className="p-3 font-semibold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => (
                                <BarisUser key={user.id} user={user} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
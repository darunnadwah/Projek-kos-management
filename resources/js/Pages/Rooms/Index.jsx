import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmActionDialog from '@/Components/ConfirmActionDialog';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ rooms = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { delete: destroy } = useForm();
    const [confirmation, setConfirmation] = useState(null);

    const handleDelete = (id) => {
        setConfirmation({
            title: 'Hapus kamar?',
            message: 'Data kamar ini akan dihapus dan tidak bisa dipulihkan.',
            confirmLabel: 'Hapus kamar',
            destructive: true,
            onConfirm: () => destroy(route('rooms.destroy', id)),
        });
    };

    return (
        <AuthenticatedLayout
            user={user}
            headerTitle="Kelola Kamar Kost"
            headerAction={
                (user?.role === 'admin' || user?.role === 'superadmin') && (
                    <Link
                        href={route('rooms.create')}
                        className="bg-[#3182CE] hover:bg-[#2569A8] text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm flex items-center gap-1"
                    >
                        + Tambah Kamar Baru
                    </Link>
                )
            }
        >
            <Head title="Kelola Kamar" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Nomor Kamar</th>
                                <th className="px-6 py-4">Deskripsi Fasilitas</th>
                                <th className="px-6 py-4">Harga / Bulan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {rooms && rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {room.room_number}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                            {room.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            Rp {Number(room.price).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    room.status === 'available'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-rose-100 text-rose-800'
                                                }`}
                                            >
                                                {room.status === 'available' ? 'Tersedia' : 'Terisi'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link
                                                href={route('rooms.edit', room.id)}
                                                className="text-[#3182CE] hover:text-[#0B1B3D] font-semibold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(room.id)}
                                                className="text-rose-600 hover:text-rose-900 font-semibold text-xs bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        Belum ada data kamar tersimpan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmActionDialog
                {...confirmation}
                show={Boolean(confirmation)}
                onCancel={() => setConfirmation(null)}
                onConfirm={() => {
                    confirmation?.onConfirm();
                    setConfirmation(null);
                }}
            />
        </AuthenticatedLayout>
    );
}
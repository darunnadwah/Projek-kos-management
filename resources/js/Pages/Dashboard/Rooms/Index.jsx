import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '../../../Components/AuthenticatedLayout';
import RoomStatus from './RoomStatus';

export default function Index({ rooms, can }) {
    const { flash } = usePage().props;
    const [deletingRoomId, setDeletingRoomId] = useState(null);

    const handleDelete = (room) => {
        const confirmed = window.confirm(
            `Hapus kamar ${room.room_number}? Data penyewaan yang terkait juga akan terhapus.`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingRoomId(room.id);
        router.delete(`/rooms/${room.id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingRoomId(null),
        });
    };

    const formatPaginationLabel = (label) => label
        .replace('&laquo;', '')
        .replace('&raquo;', '')
        .trim()
        .replace(/^Previous$/, 'Sebelumnya')
        .replace(/^Next$/, 'Berikutnya');

    return (
        <AuthenticatedLayout>
        <div className="mx-auto max-w-7xl p-4 sm:p-6">
            {flash?.success && (
                <div role="status" aria-live="polite" className="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-800">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div role="alert" className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-800">
                    {flash.error}
                </div>
            )}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Daftar kamar</h1>
                {can.create && (
                    <Link
                        href="/rooms/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white shadow transition hover:bg-blue-700"
                    >
                        + Tambah kamar
                    </Link>
                )}
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                {rooms.data.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-gray-600">Belum ada data kamar.</p>
                        {can.create && (
                            <Link href="/rooms/create" className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline">
                                Tambahkan kamar pertama
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] border-collapse text-left">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th scope="col" className="p-3 text-sm font-semibold">Nomor kamar</th>
                                    <th scope="col" className="p-3 text-sm font-semibold">Status</th>
                                    <th scope="col" className="p-3 text-sm font-semibold">Harga dasar</th>
                                    <th scope="col" className="p-3 text-sm font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {rooms.data.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50">
                                        <td className="p-3 text-sm text-gray-800">{room.room_number}</td>
                                        <td className="p-3 text-sm">
                                            <RoomStatus status={room.status} />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            Rp {Number(room.base_price).toLocaleString('id-ID')}
                                        </td>
                                        <td className="p-3 text-sm">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={`/rooms/${room.id}`}
                                                    className="rounded bg-cyan-600 px-3 py-1 text-xs text-white hover:bg-cyan-700"
                                                >
                                                    Detail
                                                </Link>
                                                {can.update && (
                                                    <Link
                                                        href={`/rooms/${room.id}/edit`}
                                                        className="rounded bg-amber-600 px-3 py-1 text-xs text-white hover:bg-amber-700"
                                                    >
                                                        Ubah
                                                    </Link>
                                                )}
                                                {can.delete && (
                                                    <button
                                                        type="button"
                                                        disabled={deletingRoomId !== null}
                                                        onClick={() => handleDelete(room)}
                                                        className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {deletingRoomId === room.id ? 'Menghapus...' : 'Hapus'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {rooms.links.length > 3 && (
                <nav aria-label="Navigasi halaman kamar" className="mt-4">
                    <ul className="flex flex-wrap gap-2">
                        {rooms.links.map((link) => (
                            <li key={link.label}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        aria-current={link.active ? 'page' : undefined}
                                        className={`inline-flex min-w-10 justify-center rounded border px-3 py-2 text-sm ${
                                            link.active
                                                ? 'border-blue-600 bg-blue-600 text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {formatPaginationLabel(link.label)}
                                    </Link>
                                ) : (
                                    <span className="inline-flex min-w-10 justify-center rounded border border-gray-200 px-3 py-2 text-sm text-gray-400">
                                        {formatPaginationLabel(link.label)}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RoomCard from '@/Components/RoomCard';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Index({ rentals = [], availableRooms = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { delete: destroy, put } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data penyewaan ini?')) {
            destroy(route('rentals.destroy', id));
        }
    };

    const handleStatusChange = (rental, newStatus) => {
        if (confirm(`Ubah status penyewaan menjadi "${newStatus}"?`)) {
            put(route('rentals.update', rental.id), { status: newStatus });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Disetujui</span>;
            case 'rejected':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">Ditolak</span>;
            default:
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Menunggu</span>;
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            headerTitle={user?.role === 'user' ? 'Pilih kamar' : 'Daftar Penyewaan Kamar'}
            headerDescription={
                user?.role === 'user'
                    ? 'Lihat kamar yang tersedia, lalu pilih yang paling sesuai.'
                    : 'Pantau dan kelola pengajuan penyewaan kamar.'
            }
            headerAction={
                user?.role === 'superadmin' && (
                    <Link
                        href={route('rentals.create')}
                        className="inline-flex items-center rounded-lg bg-[#183b34] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244d43]"
                    >
                        Ajukan sewa kamar
                    </Link>
                )
            }
        >
            <Head title="Penyewaan" />

            {user?.role === 'user' && (
                <section aria-label="Kamar yang tersedia" className="mb-9">
                    {availableRooms.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {availableRooms.map((room) => (
                                <RoomCard
                                    action={
                                        <Link
                                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#183b34] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#244d43] focus:outline-none focus:ring-2 focus:ring-[#3b7868] focus:ring-offset-2"
                                            href={`${route('rentals.create')}?room=${encodeURIComponent(room.id)}`}
                                        >
                                            Pilih kamar
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    }
                                    key={room.id}
                                    room={room}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <p className="text-sm font-semibold text-slate-800">
                                Belum ada kamar yang tersedia
                            </p>
                            <p className="mt-1.5 text-xs text-slate-500">
                                Silakan cek kembali nanti atau hubungi pengelola kos.
                            </p>
                        </div>
                    )}
                </section>
            )}

            {user?.role === 'user' && (
                <div className="mb-4">
                    <h2 className="text-base font-semibold tracking-tight text-slate-900">
                        Riwayat pengajuan
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Periksa status dan informasi penyewaanmu.
                    </p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Penyewa</th>
                                <th className="px-6 py-4">Kamar</th>
                                <th className="px-6 py-4">Tanggal Mulai</th>
                                <th className="px-6 py-4">Tanggal Selesai</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {rentals && rentals.length > 0 ? (
                                rentals.map((rental) => (
                                    <tr key={rental.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {rental.user?.name || '-'}
                                            <div className="text-xs text-gray-400 font-normal">{rental.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {rental.room?.room_number || 'Kamar Dihapus'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {rental.start_date}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {rental.end_date || 'Sewa Berkelanjutan'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(rental.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {(user?.role === 'admin' || user?.role === 'superadmin') && (
                                                <>
                                                    {rental.status !== 'approved' && (
                                                        <button
                                                            onClick={() => handleStatusChange(rental, 'approved')}
                                                            className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs px-2.5 py-1.5 rounded-md transition"
                                                        >
                                                            Setujui
                                                        </button>
                                                    )}
                                                    {rental.status !== 'rejected' && (
                                                        <button
                                                            onClick={() => handleStatusChange(rental, 'rejected')}
                                                            className="text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold text-xs px-2.5 py-1.5 rounded-md transition"
                                                        >
                                                            Tolak
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {(user?.role === 'admin' || user?.role === 'superadmin') && (
                                                <button
                                                    onClick={() => handleDelete(rental.id)}
                                                    className="text-rose-600 hover:text-rose-900 font-semibold text-xs bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                        Belum ada riwayat pengajuan sewa.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
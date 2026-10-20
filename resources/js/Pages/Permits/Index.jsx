import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Index({ permits = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { delete: destroy, put } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus perizinan ini?')) {
            destroy(route('permits.destroy', id));
        }
    };

    const handleStatusChange = (permit, newStatus) => {
        if (confirm(`Ubah status perizinan menjadi "${newStatus}"?`)) {
            put(route('permits.update', permit.id), { status: newStatus });
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
            headerTitle="Daftar Pengajuan Perizinan"
            headerAction={
                (user?.role === 'user' || user?.role === 'superadmin') && (
                    <Link
                        href={route('permits.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm flex items-center gap-1"
                    >
                        + Ajukan Izin Baru
                    </Link>
                )
            }
        >
            <Head title="Perizinan" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Pengaju</th>
                                <th className="px-6 py-4">Judul Perizinan</th>
                                <th className="px-6 py-4">Deskripsi / Keterangan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {permits && permits.length > 0 ? (
                                permits.map((permit) => (
                                    <tr key={permit.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {permit.user?.name || '-'}
                                            <div className="text-xs text-gray-400 font-normal">{permit.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {permit.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                            {permit.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(permit.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {(user?.role === 'admin' || user?.role === 'superadmin') && (
                                                <>
                                                    {permit.status !== 'approved' && (
                                                        <button
                                                            onClick={() => handleStatusChange(permit, 'approved')}
                                                            className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs px-2.5 py-1.5 rounded-md transition"
                                                        >
                                                            Setujui
                                                        </button>
                                                    )}
                                                    {permit.status !== 'rejected' && (
                                                        <button
                                                            onClick={() => handleStatusChange(permit, 'rejected')}
                                                            className="text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold text-xs px-2.5 py-1.5 rounded-md transition"
                                                        >
                                                            Tolak
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {(user?.role === 'admin' || user?.role === 'superadmin') && (
                                                <button
                                                    onClick={() => handleDelete(permit.id)}
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
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        Belum ada data pengajuan perizinan.
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
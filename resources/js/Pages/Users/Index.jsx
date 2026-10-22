import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmActionDialog from '@/Components/ConfirmActionDialog';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users = [] }) {
    const currentUser = usePage().props.auth?.user;
    const { delete: destroy } = useForm();
    const [confirmation, setConfirmation] = useState(null);

    const handleDelete = (user) => {
        setConfirmation({
            title: 'Hapus akun pengguna?',
            message: `Akun ${user.name} akan dihapus dan tidak bisa dipulihkan.`,
            confirmLabel: 'Hapus akun',
            destructive: true,
            onConfirm: () => destroy(route('users.destroy', user.id)),
        });
    };

    const roleLabels = {
        user: 'Penyewa',
        admin: 'Admin',
        superadmin: 'Superadmin',
    };

    return (
        <AuthenticatedLayout
            headerTitle="Kelola Pengguna"
            headerAction={
                <Link
                    href={route('users.create')}
                    className="bg-[#3182CE] hover:bg-[#2569A8] text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm"
                >
                    + Tambah Pengguna
                </Link>
            }
        >
            <Head title="Kelola Pengguna" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{roleLabels[user.role]}</td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="text-[#3182CE] hover:text-[#0B1B3D] font-semibold text-xs"
                                        >
                                            Edit
                                        </Link>
                                        {currentUser?.id !== user.id && (
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="text-rose-600 hover:text-rose-900 font-semibold text-xs"
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                        Belum ada pengguna.
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

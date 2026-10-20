import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Index({ users = [] }) {
    const currentUser = usePage().props.auth?.user;
    const { delete: destroy } = useForm();

    const handleDelete = (user) => {
        if (confirm(`Hapus akun ${user.name}?`)) {
            destroy(route('users.destroy', user.id));
        }
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm"
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
                                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs"
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
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Form({ user, roles }) {
    const currentUser = usePage().props.auth?.user;
    const isEditing = Boolean(user);
    const isCurrentUser = isEditing && currentUser?.id === user.id;
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? 'user',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            put(route('users.update', user.id));
        } else {
            post(route('users.store'));
        }
    };

    return (
        <AuthenticatedLayout
            headerTitle={isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'}
            headerAction={
                <Link
                    href={route('users.index')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg text-sm transition"
                >
                    Kembali
                </Link>
            }
        >
            <Head title={isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'} />

            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={data.role}
                            disabled={isCurrentUser}
                            onChange={(event) => setData('role', event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm disabled:bg-gray-100"
                        >
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password {isEditing && '(kosongkan jika tidak diubah)'}
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

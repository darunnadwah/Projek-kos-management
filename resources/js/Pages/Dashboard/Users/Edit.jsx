import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ user }) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '', // Kosongkan password agar opsional saat edit
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Ubah Pengguna" />
            
            <h1 className="text-2xl font-bold mb-6">Ubah Data Pengguna</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nama</label>
                    <input 
                        type="text" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        value={data.email} 
                        onChange={e => setData('email', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Password Baru (Opsional)</label>
                    <input 
                        type="password" 
                        value={data.password} 
                        onChange={e => setData('password', e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Kosongkan jika tidak ingin mengubah password"
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <div className="flex gap-4">
                    <button disabled={processing} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Perbarui
                    </button>
                    <Link href="/users" className="bg-gray-300 px-4 py-2 rounded">
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
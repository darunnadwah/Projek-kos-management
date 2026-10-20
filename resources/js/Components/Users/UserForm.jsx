import React from 'react';

export default function UserForm({ data, setData, errors, processing, handleSubmit, isEdit = false }) {
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
            {/* Nama Lengkap */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Nama Lengkap</label>
                <input
                    type="text"
                    value={data.name || ''}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    placeholder="Contoh: Hanzuel Akbar"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Alamat Email</label>
                <input
                    type="email"
                    value={data.email || ''}
                    onChange={e => setData('email', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    placeholder="nama@email.com"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            {/* Hak Akses / Role */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Peran (Role)</label>
                <select
                    value={data.role || 'pengekos'}
                    onChange={e => setData('role', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="pengekos">Pengekos / Penyewa</option>
                    <option value="admin">Admin / Pengelola</option>
                    <option value="superadmin">Super Admin</option>
                </select>
                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
            </div>

            {/* Tombol Submit dengan State Processing */}
            <div className="pt-2">
                <button
                    disabled={processing}
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui Pengguna' : 'Simpan Pengguna')}
                </button>
            </div>
        </form>
    );
}
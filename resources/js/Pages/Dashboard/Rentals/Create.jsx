import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ users, rooms }) {
    const { data, setData, post, errors, processing } = useForm({
        user_id: '',
        room_id: '',
        start_date: '',
        end_date: '',
        total_price: '',
        payment_status: 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/rentals');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Buat Penyewaan" />
            
            <h1 className="text-2xl font-bold mb-6">Tambah Data Penyewaan Baru</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                {/* Dropdown Pilih User */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Pilih Pengguna</label>
                    <select 
                        value={data.user_id} 
                        onChange={e => setData('user_id', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Pilih User --</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                    {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
                </div>

                {/* Dropdown Pilih Kamar (Menggunakan base_price) */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Pilih Kamar</label>
                    <select 
                        value={data.room_id} 
                        onChange={e => setData('room_id', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Pilih Kamar --</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                                Kamar {room.room_number} - Rp {room.base_price}
                            </option>
                        ))}
                    </select>
                    {errors.room_id && <div className="text-red-500 text-sm mt-1">{errors.room_id}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Tanggal Mulai</label>
                    <input 
                        type="date" 
                        value={data.start_date} 
                        onChange={e => setData('start_date', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Tanggal Selesai</label>
                    <input 
                        type="date" 
                        value={data.end_date} 
                        onChange={e => setData('end_date', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Total Harga</label>
                    <input 
                        type="number" 
                        value={data.total_price} 
                        onChange={e => setData('total_price', e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Contoh: 1500000"
                    />
                    {errors.total_price && <div className="text-red-500 text-sm mt-1">{errors.total_price}</div>}
                </div>

                <div className="flex gap-4">
                    <button disabled={processing} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                    <Link href="/rentals" className="bg-gray-300 px-4 py-2 rounded">
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
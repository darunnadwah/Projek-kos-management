import React from 'react';

export default function RentalForm({ data, setData, errors, processing, handleSubmit, users = [], rooms = [], isEdit = false }) {
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
            {/* Pilih Pengguna */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Pilih Pengguna</label>
                <select
                    value={data.user_id || ''}
                    onChange={e => setData('user_id', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="">-- Pilih User --</option>
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.name} ({u.email})
                        </option>
                    ))}
                </select>
                {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
            </div>

            {/* Pilih Kamar */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Pilih Kamar</label>
                <select
                    value={data.room_id || ''}
                    onChange={e => setData('room_id', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="">-- Pilih Kamar --</option>
                    {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                            Kamar No. {r.room_number} - Rp {Number(r.base_price).toLocaleString('id-ID')}
                        </option>
                    ))}
                </select>
                {errors.room_id && <div className="text-red-500 text-sm mt-1">{errors.room_id}</div>}
            </div>

            {/* Tanggal Mulai */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Tanggal Mulai</label>
                <input
                    type="date"
                    value={data.start_date || ''}
                    onChange={e => setData('start_date', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                />
                {errors.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
            </div>

            {/* Tanggal Selesai */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Tanggal Selesai</label>
                <input
                    type="date"
                    value={data.end_date || ''}
                    onChange={e => setData('end_date', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                />
                {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
            </div>

            {/* Total Harga */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Total Harga</label>
                <input
                    type="number"
                    value={data.total_price || ''}
                    onChange={e => setData('total_price', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    placeholder="Contoh: 1500000"
                />
                {errors.total_price && <div className="text-red-500 text-sm mt-1">{errors.total_price}</div>}
            </div>

            {/* Dropdown Status Sewa & Status Pembayaran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-1">Status Sewa</label>
                    <select
                        value={data.status || 'active'}
                        onChange={e => setData('status', e.target.value)}
                        className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    >
                        <option value="active">Active (Aktif)</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed (Selesai)</option>
                        <option value="cancelled">Cancelled (Batal)</option>
                    </select>
                    {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-1">Status Pembayaran</label>
                    <select
                        value={data.payment_status || 'pending'}
                        onChange={e => setData('payment_status', e.target.value)}
                        className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    >
                        <option value="pending">Pending (Belum Lunas)</option>
                        <option value="verified">Verified (Lunas)</option>
                    </select>
                    {errors.payment_status && <div className="text-red-500 text-sm mt-1">{errors.payment_status}</div>}
                </div>
            </div>

            {/* Tombol Simpan & Batal */}
            <div className="flex gap-3 pt-2">
                <button
                    disabled={processing}
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui' : 'Simpan')}
                </button>
            </div>
        </form>
    );
}
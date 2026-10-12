import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        room_number: '',
        status: '',
        base_price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/rooms');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Tambah Kamar Baru</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Kamar</label>
                        <input
                            type="text"
                            className={`w-full p-2.5 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 ${errors.room_number ? 'border-red-500' : 'border-gray-300'}`}
                            value={data.room_number}
                            onChange={(e) => setData('room_number', e.target.value)}
                        />
                        {errors.room_number && (
                            <p className="mt-1 text-xs text-red-600">{errors.room_number}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status Kamar</label>
                        <select
                            className={`w-full p-2.5 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="">-- Pilih Status --</option>
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-xs text-red-600">{errors.status}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga Dasar (Rp)</label>
                        <input
                            type="number"
                            className={`w-full p-2.5 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 ${errors.base_price ? 'border-red-500' : 'border-gray-300'}`}
                            value={data.base_price}
                            onChange={(e) => setData('base_price', e.target.value)}
                        />
                        {errors.base_price && (
                            <p className="mt-1 text-xs text-red-600">{errors.base_price}</p>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <Link href="/rooms" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
                            Batal
                        </Link>
                        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium" disabled={processing}>
                            Simpan Kamar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
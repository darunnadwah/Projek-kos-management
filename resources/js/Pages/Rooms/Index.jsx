import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Index({ auth, rooms }) {
    const [modalMode, setModalMode] = useState(null); // 'add', 'edit', atau 'delete'
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        room_number: '', // Disesuaikan dengan kolom database Anda
        description: '',
        price: '',
        status: 'available',
    });

    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        clearErrors();

        if (mode === 'edit' && item) {
            setData({
                room_number: item.room_number || '',
                description: item.description || '',
                price: item.price || '',
                status: item.status || 'available',
            });
        } else if (mode === 'add') {
            reset();
        }
    };

    const closeModal = () => {
        setModalMode(null);
        setSelectedItem(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            post(route('rooms.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else if (modalMode === 'edit' && selectedItem) {
            put(route('rooms.update', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else if (modalMode === 'delete' && selectedItem) {
            destroy(route('rooms.destroy', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Kamar Kost</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Kamar</h3>
                        <PrimaryButton onClick={() => openModal('add')}>
                            + Tambah Kamar Baru
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nomor / Nama Kamar</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fasilitas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga / Bulan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rooms && rooms.length > 0 ? (
                                    rooms.map((room) => (
                                        <tr key={room.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{room.room_number}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{room.description}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Rp {Number(room.price).toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    room.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                <button onClick={() => openModal('edit', room)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                <button onClick={() => openModal('delete', room)} className="text-red-600 hover:text-red-900">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data kamar.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah & Edit Kamar */}
            <Modal show={modalMode === 'add' || modalMode === 'edit'} onClose={closeModal} maxWidth="md">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {modalMode === 'add' ? 'Tambah Kamar Baru' : 'Edit Kamar'}
                    </h2>

                    <div className="mb-4">
                        <InputLabel value="Nomor / Nama Kamar" />
                        <TextInput
                            type="text"
                            value={data.room_number}
                            onChange={(e) => setData('room_number', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.room_number} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Deskripsi / Fasilitas" />
                        <TextInput
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Harga per Bulan (Rp)" />
                        <TextInput
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Konfirmasi Hapus Kamar */}
            <Modal show={modalMode === 'delete'} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Konfirmasi Hapus Kamar</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus kamar <strong>{selectedItem?.room_number}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        <DangerButton onClick={handleSubmit} disabled={processing}>
                            {processing ? 'Menghapus...' : 'Ya, Hapus'}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
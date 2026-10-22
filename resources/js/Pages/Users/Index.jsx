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

export default function Index({ auth, users }) {
    const [modalMode, setModalMode] = useState(null); // 'add', 'edit', atau 'delete'
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'penghuni',
    });

    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        clearErrors();

        if (mode === 'edit' && item) {
            setData({
                name: item.name || '',
                email: item.email || '',
                password: '',
                role: item.role || 'penghuni',
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
            post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else if (modalMode === 'edit' && selectedItem) {
            put(route('users.update', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else if (modalMode === 'delete' && selectedItem) {
            destroy(route('users.destroy', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Pengguna</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Pengguna / Penghuni</h3>
                        <PrimaryButton onClick={() => openModal('add')}>
                            + Tambah Pengguna Baru
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users && users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                    <button onClick={() => openModal('edit', user)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                    <button onClick={() => openModal('delete', user)} className="text-red-600 hover:text-red-900">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data pengguna.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah & Edit Pengguna */}
            <Modal show={modalMode === 'add' || modalMode === 'edit'} onClose={closeModal} maxWidth="md">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {modalMode === 'add' ? 'Tambah Pengguna Baru' : 'Edit Pengguna'}
                    </h2>

                    <div className="mb-4">
                        <InputLabel value="Nama Lengkap" />
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Email" />
                        <TextInput
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value={modalMode === 'edit' ? 'Password (Kosongkan jika tidak diubah)' : 'Password'} />
                        <TextInput
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full"
                            {...(modalMode === 'add' ? { required: true } : {})}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Konfirmasi Hapus Pengguna */}
            <Modal show={modalMode === 'delete'} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Konfirmasi Hapus Pengguna</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus pengguna <strong>{selectedItem?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
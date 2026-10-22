import { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Index({ auth, permits }) {
    // State untuk mengontrol Modal Custom
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(''); // 'approve', 'reject', atau 'delete'
    const [processing, setProcessing] = useState(false);

    // Fungsi untuk membuka modal kustom
    const openModal = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
        setIsOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
        setActionType('');
    };

    // Fungsi eksekusi data ke backend via Inertia
    const handleSubmit = () => {
        if (!selectedItem) return;

        setProcessing(true);
        let url = '';
        let data = {};

        if (actionType === 'approve') {
            url = route('permits.update', selectedItem.id);
            data = { status: 'approved' };
        } else if (actionType === 'reject') {
            url = route('permits.update', selectedItem.id);
            data = { status: 'rejected' };
        } else if (actionType === 'delete') {
            url = route('permits.destroy', selectedItem.id);
        }

        const options = {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => setProcessing(false),
        };

        if (actionType === 'delete') {
            router.delete(url, options);
        } else {
            router.put(url, data, options);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Izin</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Pengajuan Perizinan</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {permits && permits.length > 0 ? (
                                    permits.map((permit) => (
                                        <tr key={permit.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {permit.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {permit.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    permit.status === 'approved' ? 'bg-green-100 text-green-850' :
                                                    permit.status === 'rejected' ? 'bg-red-100 text-red-850' : 'bg-yellow-100 text-yellow-850'
                                                }`}>
                                                    {permit.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => openModal(permit, 'approve')}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() => openModal(permit, 'reject')}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                >
                                                    Tolak
                                                </button>
                                                <button
                                                    onClick={() => openModal(permit, 'delete')}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Tidak ada data perizinan.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Komponen Modal Custom Pengganti Popup Browser */}
            <Modal show={isOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {actionType === 'approve' && 'Konfirmasi Setujui Pengajuan'}
                        {actionType === 'reject' && 'Konfirmasi Tolak Pengajuan'}
                        {actionType === 'delete' && 'Konfirmasi Hapus Data'}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        {actionType === 'approve' && 'Apakah Anda yakin ingin mengubah status perizinan ini menjadi "approved"?'}
                        {actionType === 'reject' && 'Apakah Anda yakin ingin menolak pengajuan perizinan ini?'}
                        {actionType === 'delete' && 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.'}
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        {actionType === 'delete' ? (
                            <DangerButton onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Memproses...' : 'Ya, Hapus'}
                            </DangerButton>
                        ) : (
                            <PrimaryButton onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Memproses...' : 'Ya, Lanjutkan'}
                            </PrimaryButton>
                        )}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
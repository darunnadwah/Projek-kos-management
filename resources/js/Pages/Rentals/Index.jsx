import { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Index({ auth, rentals }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(''); // 'approve', 'reject', atau 'delete'
    const [processing, setProcessing] = useState(false);

    const openModal = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
        setActionType('');
    };

    const handleSubmit = () => {
        if (!selectedItem) return;

        setProcessing(true);
        let url = '';
        let data = {};

        if (actionType === 'approve') {
            url = route('rentals.update', selectedItem.id);
            data = { status: 'approved' };
        } else if (actionType === 'reject') {
            url = route('rentals.update', selectedItem.id);
            data = { status: 'rejected' };
        } else if (actionType === 'delete') {
            url = route('rentals.destroy', selectedItem.id);
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Penyewaan Kost</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Penyewa & Sewa Kamar</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penghuni</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kamar</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rentals && rentals.length > 0 ? (
                                        rentals.map((rental) => (
                                            <tr key={rental.id}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{rental.user?.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{rental.room?.room_number || rental.room?.name}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        rental.status === 'approved' || rental.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        rental.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {rental.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                    <button onClick={() => openModal(rental, 'approve')} className="text-green-600 hover:text-green-900">Setujui</button>
                                                    <button onClick={() => openModal(rental, 'reject')} className="text-yellow-600 hover:text-yellow-900">Tolak</button>
                                                    <button onClick={() => openModal(rental, 'delete')} className="text-red-600 hover:text-red-900">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data penyewaan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Custom */}
            <Modal show={isOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {actionType === 'approve' && 'Konfirmasi Setujui Sewa'}
                        {actionType === 'reject' && 'Konfirmasi Tolak Sewa'}
                        {actionType === 'delete' && 'Konfirmasi Hapus Data Sewa'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {actionType === 'approve' && 'Apakah Anda yakin ingin menyetujui penyewaan kamar ini?'}
                        {actionType === 'reject' && 'Apakah Anda yakin ingin menolak pengajuan penyewaan ini?'}
                        {actionType === 'delete' && 'Apakah Anda yakin ingin menghapus data penyewaan ini? Tindakan ini tidak dapat dibatalkan.'}
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        {actionType === 'delete' ? (
                            <DangerButton onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Menghapus...' : 'Ya, Hapus'}
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
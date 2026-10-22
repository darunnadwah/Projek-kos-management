import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('permits.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headerTitle="Form Pengajuan Perizinan"
            headerAction={
                <Link
                    href={route('permits.index')}
                    className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 font-medium px-4 py-2 rounded-lg text-sm transition"
                >
                    Kembali
                </Link>
            }
        >
            <Head title="Buat Perizinan" />

            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul / Perihal Izin</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                            placeholder="Contoh: Izin Membawa Tamu / Izin Keterlambatan Pulang"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi / Alasan Perizinan</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="4"
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                            placeholder="Jelaskan detail perizinan yang diajukan..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#3182CE] hover:bg-[#2569A8] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Izin'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
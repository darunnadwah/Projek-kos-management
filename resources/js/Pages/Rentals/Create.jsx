import RoomCard from '@/Components/RoomCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, rooms = [], selectedRoomId }) {
    const { data, setData, post, processing, errors } = useForm({
        room_id: selectedRoomId ? String(selectedRoomId) : '',
        start_date: '',
        end_date: '',
    });
    const selectedRoom = rooms.find(
        (room) => String(room.id) === data.room_id,
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rentals.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headerTitle="Ajukan sewa kamar"
            headerDescription="Pilih kamar yang tersedia, lalu tentukan tanggal penyewaan."
            headerAction={
                <Link
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    href={route('rentals.index')}
                >
                    Kembali
                </Link>
            }
        >
            <Head title="Ajukan Sewa" />

            <form onSubmit={handleSubmit}>
                <section aria-label="Pilih kamar" className="mb-8">
                    {rooms.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {rooms.map((room) => (
                                <RoomCard
                                    action={
                                        <button
                                            aria-pressed={
                                                data.room_id === String(room.id)
                                            }
                                            className={`inline-flex shrink-0 items-center justify-center rounded-lg px-3 py-2 text-[11px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:ring-offset-2 ${
                                                data.room_id === String(room.id)
                                                    ? 'bg-blue-50 text-[#0B1B3D]'
                                                    : 'bg-[#3182CE] text-white hover:bg-[#2569A8]'
                                            }`}
                                            onClick={() =>
                                                setData('room_id', String(room.id))
                                            }
                                            type="button"
                                        >
                                            {data.room_id === String(room.id)
                                                ? 'Dipilih'
                                                : 'Pilih kamar'}
                                        </button>
                                    }
                                    key={room.id}
                                    room={room}
                                    selected={
                                        data.room_id === String(room.id)
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <p className="text-sm font-semibold text-slate-800">
                                Belum ada kamar yang tersedia
                            </p>
                            <p className="mt-1.5 text-xs text-slate-500">
                                Silakan cek kembali nanti atau hubungi pengelola kos.
                            </p>
                        </div>
                    )}
                    {errors.room_id && (
                        <p className="mt-2 text-xs text-rose-600">
                            {errors.room_id}
                        </p>
                    )}
                </section>

                <section className="max-w-2xl rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
                    <div className="border-b border-slate-100 pb-4">
                        <h2 className="text-sm font-semibold text-slate-900">
                            Tanggal penyewaan
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            {selectedRoom
                                ? `Kamar ${selectedRoom.room_number} dipilih.`
                                : 'Pilih kamar di atas sebelum mengisi tanggal.'}
                        </p>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-700"
                                htmlFor="start_date"
                            >
                                Mulai sewa
                            </label>
                            <input
                                className="mt-2 block w-full rounded-lg border-slate-300 text-sm text-slate-800 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE]"
                                id="start_date"
                                onChange={(e) =>
                                    setData('start_date', e.target.value)
                                }
                                required
                                type="date"
                                value={data.start_date}
                            />
                            {errors.start_date && (
                                <p className="mt-1.5 text-xs text-rose-600">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-700"
                                htmlFor="end_date"
                            >
                                Selesai sewa
                                <span className="ml-1 font-normal text-slate-400">
                                    (opsional)
                                </span>
                            </label>
                            <input
                                className="mt-2 block w-full rounded-lg border-slate-300 text-sm text-slate-800 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE]"
                                id="end_date"
                                onChange={(e) =>
                                    setData('end_date', e.target.value)
                                }
                                type="date"
                                value={data.end_date}
                            />
                            <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                                Kosongkan untuk sewa bulanan tanpa tanggal akhir.
                            </p>
                            {errors.end_date && (
                                <p className="mt-1.5 text-xs text-rose-600">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
                        <button
                            className="rounded-lg bg-[#3182CE] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2569A8] focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={processing || !data.room_id}
                            type="submit"
                        >
                            {processing ? 'Mengirim pengajuan...' : 'Kirim pengajuan'}
                        </button>
                    </div>
                </section>
            </form>
        </AuthenticatedLayout>
    );
}

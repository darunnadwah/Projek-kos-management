import Modal from '@/Components/Modal';

export default function ConfirmActionDialog({
    show,
    title,
    message,
    confirmLabel = 'Lanjutkan',
    destructive = false,
    onConfirm,
    onCancel,
}) {
    return (
        <Modal show={show} onClose={onCancel} maxWidth="md">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            destructive
                                ? 'bg-rose-50 text-rose-600'
                                : 'bg-blue-50 text-[#0B1B3D]'
                        }`}
                    >
                        {destructive ? (
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" />
                            </svg>
                        ) : (
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                            </svg>
                        )}
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-base font-semibold tracking-tight text-slate-900">
                            {title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                        onClick={onCancel}
                        type="button"
                    >
                        Batal
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            destructive
                                ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
                                : 'bg-[#3182CE] hover:bg-[#2569A8] focus:ring-[#3182CE]'
                        }`}
                        onClick={onConfirm}
                        type="button"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

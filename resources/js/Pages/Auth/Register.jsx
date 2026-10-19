import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const { errors = {} } = usePage().props;
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post('/register');
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Head title="Daftar" />

            <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow sm:p-8">
                <h1 className="text-2xl font-bold text-gray-900">Buat akun petugas</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Akun yang didaftarkan mendapat akses petugas.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={form.data.name}
                            onChange={(event) => form.setData('name', event.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {errors.name && <p role="alert" className="text-sm text-red-700">{errors.name}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {errors.email && <p role="alert" className="text-sm text-red-700">{errors.email}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Kata sandi (minimal 8 karakter)
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={form.data.password}
                            onChange={(event) => form.setData('password', event.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {errors.password && <p role="alert" className="text-sm text-red-700">{errors.password}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                            Ulangi kata sandi
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={form.data.password_confirmation}
                            onChange={(event) => form.setData('password_confirmation', event.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {form.processing ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-blue-700 hover:underline">
                        Masuk
                    </Link>
                </p>
            </section>
        </main>
    );
}

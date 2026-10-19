import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login() {
    const { errors = {}, flash } = usePage().props;
    const form = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post('/login');
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Head title="Masuk" />

            <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow sm:p-8">
                <h1 className="text-2xl font-bold text-gray-900">Masuk ke Kos Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Masuk menggunakan email dan kata sandi.
                </p>

                {flash?.error && (
                    <div role="alert" className="mt-5 rounded-lg bg-red-100 p-4 text-sm text-red-800">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
                            Kata sandi
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={form.data.password}
                            onChange={(event) => form.setData('password', event.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {errors.password && <p role="alert" className="text-sm text-red-700">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {form.processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
                    <span className="h-px flex-1 bg-gray-200" />
                    atau
                    <span className="h-px flex-1 bg-gray-200" />
                </div>

                <a
                    href="/auth/google/redirect"
                    className="inline-flex w-full justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Masuk dengan Google
                </a>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-semibold text-blue-700 hover:underline">
                        Daftar
                    </Link>
                </p>
            </section>
        </main>
    );
}

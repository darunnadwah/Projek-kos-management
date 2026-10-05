<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Kelola Kamar') - {{ config('app.name', 'Kos Management') }}</title>
    <style>
        :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #18324b; background: #f3f6fa; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        a { color: #155e9b; }
        .topbar { background: #123a5c; color: #fff; }
        .topbar-inner, main { width: min(1040px, calc(100% - 32px)); margin: 0 auto; }
        .topbar-inner { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .brand { color: white; text-decoration: none; font-size: 1.1rem; font-weight: 750; letter-spacing: .01em; }
        .nav-link { color: #e8f1f8; text-decoration: none; font-weight: 600; }
        main { padding: 38px 0 64px; }
        h1 { margin: 0; color: #123a5c; font-size: clamp(1.7rem, 4vw, 2.25rem); }
        .page-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
        .muted { color: #66788a; }
        .card { background: #fff; border: 1px solid #e1e8ef; border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgb(18 58 92 / 5%); }
        .button { display: inline-flex; justify-content: center; align-items: center; gap: 8px; min-height: 42px; padding: 9px 16px; border: 1px solid transparent; border-radius: 8px; background: #155e9b; color: #fff; font: inherit; font-weight: 650; text-decoration: none; cursor: pointer; }
        .button:hover { background: #104b7d; }
        .button-secondary { background: #fff; color: #24445f; border-color: #cbd7e2; }
        .button-secondary:hover { background: #f4f7fa; }
        .button-danger { background: #a63737; }
        .button-danger:hover { background: #852c2c; }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .actions form { margin: 0; }
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 12px; border-bottom: 1px solid #e7edf2; text-align: left; vertical-align: middle; }
        th { color: #526a7e; font-size: .83rem; text-transform: uppercase; letter-spacing: .05em; }
        tbody tr:last-child td { border-bottom: 0; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #eaf3fb; color: #155e9b; font-size: .82rem; font-weight: 650; }
        .alert { margin-bottom: 20px; padding: 14px 16px; border: 1px solid #b7dfc2; border-radius: 9px; background: #effaf2; color: #205c30; }
        .alert-error { border-color: #efc0c0; background: #fff2f2; color: #8a2525; }
        .alert ul { margin: 8px 0 0; padding-left: 22px; }
        .form-grid { display: grid; gap: 18px; max-width: 620px; }
        label { display: block; margin-bottom: 7px; font-weight: 650; }
        input, select { width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid #cbd7e2; border-radius: 8px; background: #fff; color: #18324b; font: inherit; }
        input:focus, select:focus { outline: 3px solid rgb(21 94 155 / 16%); border-color: #155e9b; }
        .field-error { margin: 6px 0 0; color: #a02f2f; font-size: .9rem; }
        .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 20px; }
        .detail-label { margin: 0 0 5px; color: #66788a; font-size: .9rem; }
        .detail-value { margin: 0; font-size: 1.1rem; font-weight: 650; }
        .empty { padding: 34px 16px; text-align: center; color: #66788a; }
        .pagination { margin-top: 20px; }
        @media (max-width: 600px) { .topbar-inner { min-height: 60px; } main { padding-top: 26px; } .card { padding: 18px; } th, td { padding: 11px 9px; } }
    </style>
</head>
<body>
    <header class="topbar">
        <div class="topbar-inner">
            <a class="brand" href="{{ route('rooms.index') }}">Kos Management</a>
            <a class="nav-link" href="{{ route('rooms.index') }}">Daftar kamar</a>
        </div>
    </header>

    <main>
        @if (session('success'))
            <div class="alert" role="status">{{ session('success') }}</div>
        @endif

        @if ($errors->any())
            <div class="alert alert-error" role="alert">
                <strong>Data belum bisa diproses. Periksa kembali input berikut:</strong>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </main>
</body>
</html>

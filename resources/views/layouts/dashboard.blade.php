<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management Kos</title>
    <!-- Bootstrap CSS (Tanpa JS) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            min-height: 100vh;
            background-color: #f8f9fa;
        }
        .sidebar {
            width: 240px;
            min-height: 100vh;
            background-color: #1e293b;
        }
        .sidebar a {
            color: #94a3b8;
            text-decoration: none;
            padding: 10px 15px;
            display: block;
            border-radius: 6px;
            margin-bottom: 4px;
        }
        .sidebar a:hover, .sidebar a.active {
            background-color: #2563eb;
            color: #ffffff;
        }
        .content-area {
            flex: 1;
            padding: 30px;
        }
    </style>
</head>
<body>

    <div class="d-flex">
        <!-- Sidebar Navigation -->
        <aside class="sidebar p-3">
            <h4 class="text-white fw-bold mb-4 px-2">Kos Admin</h4>
            <nav>
                <a href="{{ route('rooms.index') }}" class="{{ request()->routeIs('rooms.*') ? 'active' : '' }}">
                    Kelola Kamar
                </a>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="content-area">
            <!-- Penampung Flash Message -->
            @if (session('success'))
                <div class="alert alert-success mb-4" role="alert">
                    {{ session('success') }}
                </div>
            @endif

            @if (session('error'))
                <div class="alert alert-danger mb-4" role="alert">
                    {{ session('error') }}
                </div>
            @endif

            <!-- Tempat Isi Konten Ruangan (rooms/create, index, show, dll) -->
            @yield('content')
        </main>
    </div>

</body>
</html>
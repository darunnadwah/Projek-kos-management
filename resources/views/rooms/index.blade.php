@extends('layouts.app')

@section('title', 'Daftar Kamar')

@section('content')
    <div class="page-head">
        <div>
            <h1>Daftar kamar</h1>
            <p class="muted">Kelola nomor, status, dan harga kamar kos.</p>
        </div>
        <a class="button" href="{{ route('rooms.create') }}">Tambah kamar</a>
    </div>

    <section class="card">
        @if ($rooms->isEmpty())
            <div class="empty">
                <p>Belum ada data kamar.</p>
                <a href="{{ route('rooms.create') }}">Tambahkan kamar pertama</a>
            </div>
        @else
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Nomor kamar</th>
                            <th>Status</th>
                            <th>Harga dasar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($rooms as $room)
                            <tr>
                                <td><strong>{{ $room->room_number }}</strong></td>
                                <td><span class="badge">{{ ['available' => 'Tersedia', 'occupied' => 'Terisi', 'maintenance' => 'Perbaikan'][$room->status] ?? $room->status }}</span></td>
                                <td>Rp {{ number_format($room->base_price, 0, ',', '.') }}</td>
                                <td>
                                    <div class="actions">
                                        <a href="{{ route('rooms.show', $room) }}">Detail</a>
                                        <a href="{{ route('rooms.edit', $room) }}">Ubah</a>
                                        <form action="{{ route('rooms.destroy', $room) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button class="button button-danger" type="submit">Hapus</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="pagination">{{ $rooms->links() }}</div>
        @endif
    </section>
@endsection

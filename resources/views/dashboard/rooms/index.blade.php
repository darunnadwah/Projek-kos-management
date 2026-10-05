@extends('layouts.dashboard')

@section('content')
<div class="card p-4 shadow-sm" style="max-width: 600px;">
    <h3 class="mb-3">Detail Kamar {{ $room->room_number }}</h3>
    
    <p><strong>Nomor Kamar:</strong> {{ $room->room_number }}</p>
    <p><strong>Status:</strong> <span class="badge bg-info">{{ $room->status }}</span></p>
    <p><strong>Harga Dasar:</strong> Rp {{ number_format($room->base_price, 0, ',', '.') }}</p>

    <div class="mt-3">
        <a href="{{ route('rooms.index') }}" class="btn btn-secondary">Kembali</a>
        <a href="{{ route('rooms.edit', $room) }}" class="btn btn-warning">Edit</a>
    </div>
</div>
@endsection
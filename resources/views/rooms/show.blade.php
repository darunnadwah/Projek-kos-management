@extends('layouts.app')

@section('title', 'Detail Kamar')

@section('content')
    <div class="page-head">
        <div>
            <h1>Detail kamar {{ $room->room_number }}</h1>
            <p class="muted">Informasi kamar yang tersimpan di aplikasi.</p>
        </div>
        <div class="actions">
            <a class="button button-secondary" href="{{ route('rooms.index') }}">Kembali</a>
            <a class="button" href="{{ route('rooms.edit', $room) }}">Ubah kamar</a>
        </div>
    </div>

    <section class="card detail-grid">
        <div>
            <p class="detail-label">Nomor kamar</p>
            <p class="detail-value">{{ $room->room_number }}</p>
        </div>
        <div>
            <p class="detail-label">Status</p>
            <p class="detail-value">{{ ['available' => 'Tersedia', 'occupied' => 'Terisi', 'maintenance' => 'Perbaikan'][$room->status] ?? $room->status }}</p>
        </div>
        <div>
            <p class="detail-label">Harga dasar per bulan</p>
            <p class="detail-value">Rp {{ number_format($room->base_price, 0, ',', '.') }}</p>
        </div>
    </section>
@endsection

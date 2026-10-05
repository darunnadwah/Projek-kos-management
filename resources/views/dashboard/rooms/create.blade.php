@extends('layouts.dashboard')

@section('content')
<div class="card p-4 shadow-sm" style="max-width: 600px;">
    <h3 class="mb-4">Tambah Kamar Baru</h3>

    <form action="{{ route('rooms.store') }}" method="POST">
        @csrf

        <!-- Nomor Kamar -->
        <div class="mb-3">
            <label class="form-label">Nomor Kamar</label>
            <input type="text" name="room_number" class="form-control @error('room_number') is-invalid @enderror" value="{{ old('room_number') }}">
            @error('room_number')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <!-- Status -->
        <div class="mb-3">
            <label class="form-label">Status Kamar</label>
            <select name="status" class="form-select @error('status') is-invalid @enderror">
                <option value="">-- Pilih Status --</option>
                <option value="available" {{ old('status') == 'available' ? 'selected' : '' }}>Available</option>
                <option value="occupied" {{ old('status') == 'occupied' ? 'selected' : '' }}>Occupied</option>
                <option value="maintenance" {{ old('status') == 'maintenance' ? 'selected' : '' }}>Maintenance</option>
            </select>
            @error('status')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <!-- Harga Dasar -->
        <div class="mb-3">
            <label class="form-label">Harga Dasar (Rp)</label>
            <input type="number" name="base_price" class="form-control @error('base_price') is-invalid @enderror" value="{{ old('base_price') }}">
            @error('base_price')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="d-flex justify-content-between">
            <a href="{{ route('rooms.index') }}" class="btn btn-secondary">Batal</a>
            <button type="submit" class="btn btn-primary">Simpan Kamar</button>
        </div>
    </form>
</div>
@endsection
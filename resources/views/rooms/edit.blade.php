@extends('layouts.app')

@section('title', 'Ubah Kamar')

@section('content')
    <div class="page-head">
        <div>
            <h1>Ubah kamar {{ $room->room_number }}</h1>
            <p class="muted">Perbarui informasi kamar di bawah ini.</p>
        </div>
    </div>

    <section class="card">
        @include('rooms._form', [
            'action' => route('rooms.update', $room),
            'method' => 'PUT',
            'room' => $room,
            'submitLabel' => 'Simpan perubahan',
        ])
    </section>
@endsection

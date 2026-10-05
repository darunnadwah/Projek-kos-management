@extends('layouts.app')

@section('title', 'Tambah Kamar')

@section('content')
    <div class="page-head">
        <div>
            <h1>Tambah kamar</h1>
            <p class="muted">Isi data kamar yang akan ditambahkan.</p>
        </div>
    </div>

    <section class="card">
        @include('rooms._form', [
            'action' => route('rooms.store'),
            'method' => 'POST',
            'room' => null,
            'submitLabel' => 'Simpan kamar',
        ])
    </section>
@endsection

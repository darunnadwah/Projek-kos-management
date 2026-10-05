<form class="form-grid" action="{{ $action }}" method="POST">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif

    <div>
        <label for="room_number">Nomor kamar</label>
        <input id="room_number" name="room_number" type="text" value="{{ old('room_number', $room?->room_number) }}" required maxlength="255" autocomplete="off">
        @error('room_number')
            <p class="field-error">{{ $message }}</p>
        @enderror
    </div>

    <div>
        <label for="status">Status kamar</label>
        <select id="status" name="status" required>
            <option value="">Pilih status</option>
            @foreach (['available' => 'Tersedia', 'occupied' => 'Terisi', 'maintenance' => 'Perbaikan'] as $value => $label)
                <option value="{{ $value }}" @selected(old('status', $room?->status ?? 'available') === $value)>{{ $label }}</option>
            @endforeach
        </select>
        @error('status')
            <p class="field-error">{{ $message }}</p>
        @enderror
    </div>

    <div>
        <label for="base_price">Harga dasar per bulan (Rp)</label>
        <input id="base_price" name="base_price" type="number" min="0" max="4294967295" step="1" value="{{ old('base_price', $room?->base_price) }}" required>
        @error('base_price')
            <p class="field-error">{{ $message }}</p>
        @enderror
    </div>

    <div class="actions">
        <button class="button" type="submit">{{ $submitLabel }}</button>
        <a class="button button-secondary" href="{{ route('rooms.index') }}">Batal</a>
    </div>
</form>

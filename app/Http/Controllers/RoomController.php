<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class RoomController extends Controller
{
    public function index(): View
    {
        return view('dashboard.rooms.index', [
            'rooms' => Room::query()->orderBy('room_number')->paginate(10),
        ]);
    }

    public function create(): View
    {
        return view('dashboard.rooms.create');
    }

    public function store(StoreRoomRequest $request): RedirectResponse
    {
        $room = Room::create($request->validated());

        return redirect()
            ->route('rooms.show', $room)
            ->with('success', 'Kamar berhasil ditambahkan.');
    }

    public function show(Room $room): View
    {
        return view('dashboard.rooms.show', compact('room'));
    }

    public function edit(Room $room): View
    {
        return view('dashboard.rooms.edit', compact('room'));
    }

    public function update(UpdateRoomRequest $request, Room $room): RedirectResponse
    {
        $room->update($request->validated());

        return redirect()
            ->route('rooms.show', $room)
            ->with('success', 'Data kamar berhasil diperbarui.');
    }

    public function destroy(Room $room): RedirectResponse
    {
        $room->delete();

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Kamar berhasil dihapus.');
    }
}
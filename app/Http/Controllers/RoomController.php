<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::latest()->get();
        return Inertia::render('Rooms/Index', ['rooms' => $rooms]);
    }

    public function create()
    {
        return Inertia::render('Rooms/Create');
    }

    public function store(StoreRoomRequest $request)
    {
        Room::create($request->validated());
        return redirect()->route('rooms.index')->with('message', 'Kamar berhasil ditambahkan!');
    }

    public function show(Room $room)
    {
        return Inertia::render('Rooms/Show', ['room' => $room]);
    }

    public function edit(Room $room)
    {
        return Inertia::render('Rooms/Edit', ['room' => $room]);
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());
        return redirect()->route('rooms.index')->with('message', 'Data kamar berhasil diperbarui!');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('rooms.index')->with('message', 'Kamar berhasil dihapus!');
    }
}
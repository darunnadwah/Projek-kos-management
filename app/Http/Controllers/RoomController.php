<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewAny', Room::class);
        $rooms = Room::query()->orderBy('room_number')->paginate(10);
        $policyRoom = $rooms->first() ?? new Room;

        return Inertia::render('Dashboard/Rooms/Index', [
            'rooms' => $rooms,
            'can' => [
                'create' => Gate::allows('create', Room::class),
                'update' => Gate::allows('update', $policyRoom),
                'delete' => Gate::allows('delete', $policyRoom),
            ],
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Room::class);

        return Inertia::render('Dashboard/Rooms/Create');
    }

    public function store(StoreRoomRequest $request): RedirectResponse
    {
        Gate::authorize('create', Room::class);
        Room::create($request->validated());

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Kamar berhasil ditambahkan.');
    }

    public function show(Room $room): Response
    {
        Gate::authorize('view', $room);

        return Inertia::render('Dashboard/Rooms/Show', [
            'room' => $room,
            'can' => [
                'update' => Gate::allows('update', $room),
                'delete' => Gate::allows('delete', $room),
            ],
        ]);
    }

    public function edit(Room $room): Response
    {
        Gate::authorize('update', $room);

        return Inertia::render('Dashboard/Rooms/Edit', [
            'room' => $room,
        ]);
    }

    public function update(UpdateRoomRequest $request, Room $room): RedirectResponse
    {
        Gate::authorize('update', $room);
        $room->update($request->validated());

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Data kamar berhasil diperbarui.');
    }

    public function destroy(Room $room): RedirectResponse
    {
        Gate::authorize('delete', $room);
        $room->delete();

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Kamar berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Room;
use App\Http\Requests\Rental\StoreRentalRequest;
use App\Http\Requests\Rental\UpdateRentalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $rentals = Rental::with(['user', 'room'])
            ->when($user->role === 'user', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return Inertia::render('Rentals/Index', ['rentals' => $rentals]);
    }

    public function create()
    {
        $rooms = Room::where('status', 'available')->latest()->get();
        return Inertia::render('Rentals/Create', ['rooms' => $rooms]);
    }

    public function store(StoreRentalRequest $request)
    {
        Rental::create([
            'user_id'    => $request->user()->id,
            'room_id'    => $request->room_id,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
            'status'     => 'pending',
        ]);

        return redirect()->route('rentals.index')->with('message', 'Pengajuan sewa berhasil dibuat!');
    }

    public function show(Rental $rental)
    {
        $rental->load(['user', 'room']);
        return Inertia::render('Rentals/Show', ['rental' => $rental]);
    }

    public function edit(Rental $rental)
    {
        $rooms = Room::all();
        $rental->load(['user', 'room']);
        return Inertia::render('Rentals/Edit', [
            'rental' => $rental,
            'rooms'  => $rooms,
        ]);
    }

    public function update(UpdateRentalRequest $request, Rental $rental)
    {
        $rental->update($request->validated());
        return redirect()->route('rentals.index')->with('message', 'Status sewa berhasil diperbarui!');
    }

    public function destroy(Rental $rental)
    {
        $rental->delete();
        return redirect()->route('rentals.index')->with('message', 'Data sewa berhasil dihapus!');
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentalRequest;
use App\Http\Requests\UpdateRentalRequest;
use App\Models\Rental;
use App\Models\User;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RentalController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Rentals/Index', [
            // Mengurutkan dari penyewaan terbaru
            'rentals' => Rental::query()->latest()->paginate(10),
        ]);
    }

    public function create()
    {
    return Inertia::render('Dashboard/Rentals/Create', [
            'users' => User::all(),
            'rooms' => Room::all(),
        ]);
    }

    public function store(StoreRentalRequest $request): RedirectResponse
    {
        $rental = Rental::create($request->validated());

        return redirect()
            ->route('rentals.index')
            ->with('success', 'Data penyewaan berhasil ditambahkan.');
    }

    public function show(Rental $rental): Response
    {
        return Inertia::render('Dashboard/Rentals/Show', [
            'rental' => $rental,
        ]);
    }

    public function edit(Rental $rental)
    {
    return Inertia::render('Dashboard/Rentals/Edit', [
            'rental' => $rental,
            'users' => User::all(),
            'rooms' => Room::all(),
        ]);
    }

    public function update(UpdateRentalRequest $request, Rental$rental): RedirectResponse
    {
        $rental->update($request->validated());

        return redirect()
            ->route('rentals.index')
            ->with('success', 'Data penyewaan berhasil diperbarui.');
    }

    public function destroy(Rental $rental): RedirectResponse
    {
        $rental->delete();

        return redirect()
            ->route('rentals.index')
            ->with('success', 'Data penyewaan berhasil dihapus.');
    }
}
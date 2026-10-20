<?php

namespace App\Http\Controllers;


use App\Models\Permit;
use App\Http\Requests\Permit\StorePermitRequest;
use App\Http\Requests\Permit\UpdatePermitRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermitController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $permits = Permit::with('user')
            ->when($user->role === 'user', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return Inertia::render('Permits/Index', ['permits' => $permits]);
    }

    public function create()
    {
        return Inertia::render('Permits/Create');
    }

    public function store(StorePermitRequest $request)
    {
        Permit::create([
            'user_id'     => $request->user()->id,
            'title'       => $request->title,
            'description' => $request->description,
            'status'      => 'pending',
        ]);

        return redirect()->route('permits.index')->with('message', 'Pengajuan izin berhasil dibuat!');
    }

    public function show(Permit $permit)
    {
        $permit->load('user');
        return Inertia::render('Permits/Show', ['permit' => $permit]);
    }

    public function edit(Permit $permit)
    {
        $permit->load('user');
        return Inertia::render('Permits/Edit', ['permit' => $permit]);
    }

    public function update(UpdatePermitRequest $request, Permit $permit)
    {
        $permit->update($request->validated());
        return redirect()->route('permits.index')->with('message', 'Status izin berhasil diperbarui!');
    }

    public function destroy(Permit $permit)
    {
        $permit->delete();
        return redirect()->route('permits.index')->with('message', 'Data izin berhasil dihapus!');
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Permissions/Index', [
            'permissions' => Permission::query()->orderBy('name')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Dashboard/Permissions/Create');
    }

    public function store(StorePermissionRequest $request): RedirectResponse
    {
        $permission = Permission::create($request->validated());

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Hak akses berhasil ditambahkan.');
    }

    public function show(Permission $permission): Response
    {
        return Inertia::render('Dashboard/Permissions/Show', [
            'permission' => $permission,
        ]);
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('Dashboard/Permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        $permission->update($request->validated());

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Hak akses berhasil diperbarui.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Hak akses berhasil dihapus.');
    }
}
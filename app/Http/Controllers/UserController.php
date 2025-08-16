<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // TODO do pagination for users
        return inertia("User/Index",[
            "users" => AuthUserResource::collection(User::all())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit",[
            "user" => new AuthUserResource($user),
            "roles" => Role::all(),
            "roleLabel" => RolesEnum::labels()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            "roles" => ["required", "array"]
        ]);
        $user->syncRoles($data["roles"][0]);
        if ($data["roles"][0] != "admin" && Auth::id() == $user->id){
            return to_route("dashboard")->with("success","Role Chagned Successfully");
        }
        return back()->with("success","Role Chagned Successfully");
    }

}

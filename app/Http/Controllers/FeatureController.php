<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Feature::latest()->paginate();
        return Inertia("Feature/Index",[
            "features" => FeatureResource::collection($paginated),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Feature/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name"=> "required|string",
            "description"=> "nullable|string",
        ]);
        $data["user_id"] = Auth::user()->id;
        Feature::create($data);
        return to_route("feature.index")->with("success","Feature Created Successfullt");
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        return inertia("Feature/Show", [
            "feature" => new FeatureResource($feature)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return inertia("Feature/Edit", [
            "feature" => new FeatureResource($feature)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            "name"=> "required|string",
            "description"=> "nullable|string",
        ]);
        Feature::update($data);
        return to_route("feature.index")->with("success","Feature Updated Successfullt");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return to_route("feature.index")->with("success","Feature Deleted Successfullt");
    }
}

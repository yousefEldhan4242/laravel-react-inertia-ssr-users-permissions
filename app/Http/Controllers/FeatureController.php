<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserId = Auth::user()->id;

        $paginated = Feature::orderBy("id")->with("comments.user")->withCount(["upvotes as upvote_count" => function ($query) {
            $query->select(DB::raw("SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)"));
        }])->withExists(["upvotes as user_has_upvoted" => function ($q) use ($currentUserId) {
            $q->where("user_id", $currentUserId)->where("upvote", 1);
        }, "upvotes as user_has_downvoted" => function ($q) use ($currentUserId) {
            $q->where("user_id", $currentUserId)->where("upvote", 0);
        }])->paginate();


        return Inertia("Feature/Index", [
            "features" => FeatureListResource::collection($paginated),
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
            "name" => "required|string",
            "description" => "nullable|string",
        ]);
        $data["user_id"] = Auth::user()->id;
        Feature::create($data);
        return to_route("feature.index")->with("success", "Feature Created Successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $feature->upvote_count = Upvote::where("feature_id", $feature->id)
        ->sum(DB::raw("CASE WHEN upvote = 1 THEN 1 ELSE -1 END"));

        $feature->user_has_upvoted = Upvote::where("feature_id", $feature->id)
        ->where("user_id", Auth::id())
        ->where("upvote", 1)
        ->exists();
        
        $feature->user_has_downvoted = Upvote::where("feature_id", $feature->id)
        ->where("user_id", Auth::id())
        ->where("upvote", 0)
        ->exists();

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
            "name" => "required|string",
            "description" => "nullable|string",
        ]);
        $feature->update($data);
        return to_route("feature.index")->with("success", "Feature Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return to_route("feature.index")->with("success", "Feature Deleted Successfully");
    }
}

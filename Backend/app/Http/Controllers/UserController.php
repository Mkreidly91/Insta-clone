<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    function getAllUsers()
    {
        $userId = Auth::user()->id;
        $allOtherUsers = User::all()->where('id', '!=', $userId)->except(["id"]);
        $filteredData = $allOtherUsers->map(function ($user) {
            return [
                'username' => $user->username,
                'image_url' => $user->image_url,
            ];
        });
        return response()->json([
            "users" => $filteredData
        ]);
    }

    function getFollowingPosts()
    {
        $user = Auth::user();
        $following = $user->following()->with("posts")->get();

        return response()->json([
            "res" => $following
        ]);

    }
    function getPosts()
    {

        return response()->json([
            "posts" => Auth::user()->posts,
        ]);
    }

    function getLikedPosts()
    {

        $posts = Auth::user()->likedPosts;
        $results = [];
        foreach ($posts as $post) {
            $name = User::find($post->pivot->user_id)->name;
            $text = $post->text;
            $img = $post->image_url;
            $created_at = $post->created_at;

            $results[] = [
                'post_id' => $post->id,
                'name' => $name,
                'text' => $text,
                'img' => $img,
                'created_at' => $created_at,
            ];

        }


        return response()->json([
            "posts" => $posts,
        ]);

    }
}
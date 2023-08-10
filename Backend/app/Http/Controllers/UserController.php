<?php

namespace App\Http\Controllers;

use App\Models\LikedPost;
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
        $formattedResponse = $following->map(function ($user) {
            // return [
            // 'id' => $user->id,
            // 'username' => $user->username,
            // 'image_url' => $user->image_url,
            // 'posts' => $user->posts->map(function ($post) {
            //     return [
            //         'post_id' => $post->id,
            //         'text' => $post->text,
            //         'post_image_url' => $post->image_url,
            //     ];
            // }),
            // ];
            return [
                $user->posts->map(function ($post) {
                    return [
                        'id' => $post->user->id,
                        'username' => $post->user->username,
                        'image_url' => $post->user->image_url,
                        'post_id' => $post->id,
                        'text' => $post->text,
                        'post_image_url' => $post->image_url,
                    ];
                }),
            ];
        });
        return response()->json([
            "res" => $formattedResponse,
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

    }
    function likePost(Request $request)
    {
        $postId = $request->post_id;
        $user = Auth::user();
        $existingLike = LikedPost::where('post_id', $postId)
            ->where('user_id', $user->id)
            ->first();
        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Post unliked'], 200);
        }

        $likePost = new LikedPost;
        $likePost->post_id = $postId;
        $likePost->user_id = $user->id;
        $likePost->save();
        return response()->json(['message' => 'Post liked'], 200);
    }

}
<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\LikedPost;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    function search(Request $request, $search)
    {
        $user = Auth::user();
        $userId = $user->id;


        if (!$search) {
            return;
        }
        $res = User::where('username', 'LIKE', "%{$search}%")->where('id', '!=', $userId)->get();
        $following = $user->following->pluck("id")->toArray();
        $final = $res->map(function ($user) use ($following) {
            $isPresent = in_array($user->id, $following);

            return [
                "id" => $user->id,
                "name" => $user->name,
                "username" => $user->username,
                "image_url" => $user->image_url,
                "isFollowing" => $isPresent
            ];

        });


        return response()->json([

            "users" => $final,
            // "following" => $following
        ]);
    }

    function getFollowingPosts()
    {
        $user = Auth::user();

        $following = $user->following()->with("posts")->get();
        $formattedResponse = $following->map(function ($user) {

            return [
                $user->posts->map(function ($post) {
                    $id = Auth::user()->id;
                    $isLiked = $post->likedByUsers->pluck("id")->toArray();
                    $isPresent = in_array($id, $isLiked);

                    return [
                        'id' => Auth::user()->id,
                        'username' => $post->user->username,
                        'image_url' => $post->user->image_url,
                        'post_id' => $post->id,
                        'text' => $post->text,
                        'post_image_url' => $post->image_url,
                        'isLiked' => $isPresent
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
        $user = Auth::user();
        $postId = $request->post_id;
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

    function followUser(Request $request)
    {
        $user = Auth::user();
        $otherUserId = $request->userId;
        $existing = Follow::where('user_1', $user->id)
            ->where('user_2', $otherUserId)
            ->first();
        if ($existing) {
            $existing->delete();
            return response()->json(['message' => 'User unfollowed'], 200);
        }

        $newFollow = new Follow;
        $newFollow->user_1 = $user->id;
        $newFollow->user_2 = $otherUserId;
        $newFollow->save();
        return response()->json(['message' => 'user followed'], 200);
    }


    function addPost(Request $request)
    {
        $user = Auth::user();
        $request->validate(
            [
                "text" => "Required|string",
                "img" => "Required|string",
            ]

        );

        $post = new Post;

        $post->user_id = $user->id;
        $post->text = $request->text;

        // Decode base 64
        $image_64 = $request->img;

        if ($image_64) {
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);
            $image = str_replace($replace, '', $image_64);
            $image = str_replace(' ', '+', $image);
            $filename = uniqid() . '.' . $extension;
            $image_url = 'images/' . $filename;
            Storage::disk('public')->put('images/' . $filename, base64_decode($image));
            $post->image_url = $image_url;
        } else {
            $post->image_url = "";
        }


        try {
            $post->save();
            return response()->json([
                'message' => 'success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e,
            ], 500);
        }

    }
}
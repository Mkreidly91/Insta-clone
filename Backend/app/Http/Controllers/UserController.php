<?php

namespace App\Http\Controllers;

use App\Models\LikedPost;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

}
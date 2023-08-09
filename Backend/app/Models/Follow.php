<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    public $timestamps = false;
    use HasFactory;
    public function follower()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function following()
    {
        return $this->belongsTo(User::class, 'user_2');
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'provider_id'
    ];

    public function medias()
    {
        return $this->hasMany(Media::class);
    }

    public function options()
    {
        return $this->belongsToMany(Option::class);
    }
}

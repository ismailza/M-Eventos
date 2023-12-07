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
        'category_id',
        'provider_id',
    ];

    public function medias()
    {
        return $this->hasMany(Media::class);
    }

    public function options()
    {
        return $this->belongsToMany(Option::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function packages()
    {
        return $this->hasMany(Package::class);
    }
    
}

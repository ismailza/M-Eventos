<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Option;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'services' => Service::where('provider_id', Auth::guard('provider')->user()->id)->latest()->get(),
        ], 200);
    }

    public function create()
    {
        return response()->json([
            'status' => 200,
            'options' => Option::all(),
        ], 200);
    }

    public function store(ServiceRequest $request)
    {
        $service = $request->validated();
        $service['provider_id'] = Auth::guard('provider')->user()->id;
        $service = Service::create($service);
        $service->options()->sync($request->validated('options'));
        $this->processMedia($service, $request->file('medias'));
        return response()->json([
            'status' => 201,
            'message' => 'Service created successfully.'
        ], 201);
    }

    public function edit(Service $service)
    {
        return response()->json([
            'status' => 200,
            'service' => $service->load('options')->load('medias'),
            'options' => Option::all(),
        ], 200);
    }

    public function update(Service $service, ServiceRequest $request)
    {
        $service->update($request->validated());
        $service->options()->sync($request->validated('options'));
        $this->processMedia($service, $request->file('medias'));
        return response()->json([
            'status' => 200,
            'message' => 'Service updated successfully.'
        ], 200);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Service deleted successfully.'
        ], 200);
    }

    private function processMedia(Service $service, $medias)
    {
        foreach ($medias as $media) {
            $service->medias()->create([
                'path' => $media->store('medias/services', 'public'),
            ]);
        }
    }
}

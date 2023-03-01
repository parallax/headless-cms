<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Inertia\Inertia;
use JsonSerializable;
use Statamic\Entries\Entry;
use Statamic\Facades\GlobalSet as GlobalSetFacade;
use Statamic\Fields\Value;
use Statamic\Fieldtypes\Assets\Assets as AssetsFieldtype;
use Statamic\Globals\GlobalSet;
use Statamic\Http\Controllers\FrontendController;
use Statamic\Structures\Page;

class InertiaStatamicAdapter
{
    protected $blueprint;
    protected $collection;
    protected $data;
    protected $page;
    protected $request;

    public function handle(Request $request, Closure $next)
    {
        if (!Str::contains($request->path(), ['forms', 'sitemap.xml'])) {
            $this->request = $request;
            $this->page = app(FrontendController::class)->index($request);
            $this->data = $this->page->toAugmentedArray();
            $this->blueprint = $this->data['blueprint']->value()['handle'];
            $this->collection = $this->data['collection']->value()['handle'];

            if ($this->page instanceof Page || $this->page instanceof Entry) {
                return Inertia::render(
                    $this->buildComponentPath(),
                    $this->buildProps(),
                );
            }
        }

        return $next($request);
    }

    protected function buildComponentPath()
    {        
        $path = collect([
            $this->collection,
            $this->blueprint,
        ]);

        $path = $path->map(function ($item) {
            return Str::studly($item);
        });

        return $path->join('/');
    }

    protected function buildProps()
    {
        return [
            'entry' => $this->buildEntryProps(),
            'globals' => $this->buildGlobalProps(),
            'flash' => $this->buildFlashProps(),
            'config' => $this->buildConfigProps(),
        ];
    }

    protected function buildEntryProps()
    {
        $entryData = collect($this->formatPropData($this->data));

        $entryData->put('children', $this->getChildren());

        return $entryData->all();
    }

    protected function buildGlobalProps()
    {
        $globals = GlobalSetFacade::all();

        return collect($globals)->mapWithKeys(function ($global) {
            return [$global->handle() => $this->formatPropData($global)];
        })->toArray();
    }

    protected function buildConfigProps()
    {
        $config = [
            'example_config_item' => false,
        ];

        return $config;
    }

    protected function buildFlashProps()
    {
        $keys = $this->request->session()->get('_flash.old');

        return collect($keys)->mapWithKeys(function ($key) {
            return [$key => $this->request->session()->get($key)];
        })->toArray();
    }

    protected function formatPropData($data)
    {
        if ($data instanceof Value) {
            if ($data->fieldtype() instanceof AssetsFieldtype && $data->value()) {
                return $this->filterImageData($data->value()->toAugmentedArray());
            }
        }

        if ($data instanceof Carbon) {
            return $data;
        }

        if ($data instanceof JsonSerializable || $data instanceof Collection) {
            return $this->formatPropData($data->jsonSerialize());
        }

        if ($data instanceof GlobalSet) {
            return $this->formatPropData($data->localizations()->get('default'));
        }

        if (is_array($data)) {
            $response = collect($data)->map(function ($value) {
                return $this->formatPropData($value);
            })->all();

            return $this->filterData($response);
        }

        if ($data instanceof Value) {            
            return $data->value();
        }

        if (is_object($data) && method_exists($data, 'toAugmentedArray')) {
            return $this->formatPropData($data->toAugmentedArray());
        }

        return $data;
    }

    protected function filterData($data)
    {
        $collection = collect($data);

        $filtered = $collection->except(
            'collection',
            'edit_url',
            'entry_id',
            'parent',
            'updated_by',
        );

        return $filtered->all();
    }

    public function filterImageData($data)
    {
        $collection = collect($data);

        $filtered = $collection->only(
            'id',
            'title',
            'url',
            'width',
            'height',
            'ratio',
            'orientation'
        );

        return $filtered->all();
    }

    protected function getChildren()
    {
        // https://statamic.com/forum/4973-how-to-get-the-child-entries-of-current-using-statamic-entries-entry-object

        if ($this->page->hasStructure()) {
            // Get the children from the structure tree filtered by this entry ID
            $structure = collect($this->page->structure()->in($this->page->locale())->tree())
                ->filter(function ($parent) {
                    return $parent['entry'] == $this->page->id();
                })
                ->first();

            $children = data_get($structure, 'children');

            if ($children) {
                // Return the entries
                return collect($children)->flatten()->transform(function ($id) {
                    return $this->formatPropData(Entry::find($id));
                });
            }
        }

        return null;
    }
}
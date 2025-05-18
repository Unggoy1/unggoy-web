<script>
  import { SAMPLE_MAPS, SAMPLE_MODES } from './sample-data';
  
  let expandedMode = null;
</script>

<div class="space-y-6">
  {#each SAMPLE_MODES as mode}
    <div class="-800 rounded-lg overflow-hidden">
      <div 
        class="p-4 flex items-center gap-4 cursor-pointer hover:-700"
        on:click={() => expandedMode = expandedMode === mode.id ? null : mode.id}
      >
        <img 
          src={mode.thumbnailUrl}
          alt={mode.name}
          class="w-40 h-24 object-cover rounded"
        />
        <div class="flex-1">
          <h3 class="text-white font-medium">{mode.name}</h3>
          <p class="text-slate-400 text-sm">2 maps in set</p>
        </div>
        <button class="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          Add Map
        </button>
      </div>
      
      {#if expandedMode === mode.id}
        <div class="border-t border-slate-700 p-4">
          <div class="grid grid-cols-3 gap-3">
            {#each SAMPLE_MAPS.slice(0, 2) as map}
              <div class="group relative">
                <img 
                  src={map.thumbnailUrl}
                  alt={map.name}
                  class="w-full aspect-video object-cover rounded"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
                  {map.name}
                </div>
                <button class="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            {/each}
            <button class="flex items-center justify-center aspect-video -700 rounded hover:-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
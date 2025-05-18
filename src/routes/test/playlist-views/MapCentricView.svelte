<script>
  import { SAMPLE_MAPS, SAMPLE_MODES } from './sample-data';
  
  let expandedMap = null;
</script>

<div class="space-y-4">
  {#each SAMPLE_MAPS as map}
    <div class="-800 rounded-lg overflow-hidden">
      <div 
        class="p-4 flex items-center gap-4 cursor-pointer hover:-700"
        on:click={() => expandedMap = expandedMap === map.id ? null : map.id}
      >
        <img 
          src={map.thumbnailUrl}
          alt={map.name}
          class="w-40 h-24 object-cover rounded"
        />
        <div class="flex-1">
          <h3 class="text-white font-medium">{map.name}</h3>
          <p class="text-slate-400 text-sm">3 modes paired</p>
        </div>
        <button class="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          Add Mode
        </button>
      </div>
      
      {#if expandedMap === map.id}
        <div class="border-t border-slate-700 p-4 grid grid-cols-2 gap-3">
          {#each SAMPLE_MODES.slice(0, 3) as mode}
            <div class="flex items-center gap-3 -700 rounded p-2">
              <img 
                src={mode.thumbnailUrl}
                alt={mode.name}
                class="w-20 h-12 object-cover rounded"
              />
              <div class="flex-1">
                <div class="text-white text-sm">{mode.name}</div>
              </div>
              <button class="text-red-400 hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
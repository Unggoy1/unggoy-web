<script>
  import { SAMPLE_MAPS, SAMPLE_MODES } from './sample-data';
  
  let selectedMap = SAMPLE_MAPS[0];
</script>

<div class="-800 rounded-lg overflow-hidden">
  <div class="relative aspect-video">
    <img 
      src={selectedMap.thumbnailUrl}
      alt={selectedMap.name}
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <div class="absolute bottom-4 left-4">
      <h2 class="text-2xl font-bold text-white">{selectedMap.name}</h2>
      <p class="text-slate-300">3 active mode pairs</p>
    </div>
  </div>
  
  <div class="p-4 border-b border-slate-700">
    <h3 class="text-sm font-medium text-slate-400 mb-3">Currently Paired With</h3>
    <div class="grid grid-cols-3 gap-3">
      {#each SAMPLE_MODES.slice(0, 3) as mode}
        <div class="group relative">
          <img 
            src={mode.thumbnailUrl}
            alt={mode.name}
            class="w-full aspect-video object-cover rounded"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded" />
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {mode.name}
          </div>
          <button class="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="p-4">
    <h3 class="text-sm font-medium text-slate-400 mb-3">Suggested Modes</h3>
    <div class="grid grid-cols-3 gap-3">
      {#each SAMPLE_MODES.slice(3) as mode}
        <div class="group relative cursor-pointer">
          <img 
            src={mode.thumbnailUrl}
            alt={mode.name}
            class="w-full aspect-video object-cover rounded opacity-75 group-hover:opacity-100 transition-opacity"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded" />
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {mode.name}
          </div>
          <div class="absolute top-2 right-2 text-xs text-slate-300">
            Popular pair
          </div>
        </div>
      {/each}
      <button class="flex items-center justify-center aspect-video -700 rounded hover:-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
    </div>
  </div>
</div>
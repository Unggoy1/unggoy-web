<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="p-4">
        <div class="flex gap-3 mb-3">
          <div class="flex-1">
            <img
              src={pair.mapAsset.thumbnailUrl}
              alt={pair.mapAsset.name}
              class="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p class="text-sm text-white font-medium truncate">{pair.mapAsset.name}</p>
            <p class="text-xs text-slate-400">Map</p>
          </div>
          <div class="flex items-center text-slate-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div class="flex-1">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p class="text-sm text-white font-medium truncate">{pair.modeAsset.name}</p>
            <p class="text-xs text-slate-400">Mode</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            class="flex-1 px-3 py-2 -700 hover:-600 text-white text-sm rounded transition-colors"
            on:click={(e) => {
              e.stopPropagation();
              console.log('Navigate to map');
            }}
          >
            Map →
          </button>
          <button 
            class="flex-1 px-3 py-2 -700 hover:-600 text-white text-sm rounded transition-colors"
            on:click={(e) => {
              e.stopPropagation();
              console.log('Navigate to mode');
            }}
          >
            Mode →
          </button>
          <button 
            class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
            on:click={(e) => {
              e.stopPropagation();
              console.log('Add to playlist');
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
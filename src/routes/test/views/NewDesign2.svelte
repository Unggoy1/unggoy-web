<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 group"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Map as background -->
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode overlay in corner -->
        <div class="absolute top-3 right-3 w-24 h-16 rounded-lg overflow-hidden ring-2 ring-white/30">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Hover overlay with actions -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div class="flex gap-3">
            <button 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
              on:click={(e) => {
                e.stopPropagation();
                console.log('View map');
              }}
            >
              View Map
            </button>
            <button 
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
              on:click={(e) => {
                e.stopPropagation();
                console.log('View mode');
              }}
            >
              View Mode
            </button>
            <button 
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              on:click={(e) => {
                e.stopPropagation();
                console.log('Add to playlist');
              }}
            >
              + Playlist
            </button>
          </div>
        </div>
        
        <!-- Bottom gradient and text -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p class="text-white font-medium">{pair.mapAsset.name}</p>
          <p class="text-slate-300 text-sm">{pair.modeAsset.name}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
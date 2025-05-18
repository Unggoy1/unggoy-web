<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden group"
    >
      <div class="aspect-video relative">
        <!-- Split view with hover zones -->
        <div class="absolute inset-0 flex">
          <div 
            class="w-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            on:click={() => console.log('Navigate to map:', pair.mapAsset)}
          >
            <img
              src={pair.mapAsset.thumbnailUrl}
              alt={pair.mapAsset.name}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div class="absolute bottom-2 left-2 text-white">
              <p class="text-xs opacity-70">Map</p>
              <p class="text-sm font-medium">{pair.mapAsset.name}</p>
            </div>
          </div>
          
          <div 
            class="w-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            on:click={() => console.log('Navigate to mode:', pair.modeAsset)}
          >
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div class="absolute bottom-2 right-2 text-white text-right">
              <p class="text-xs opacity-70">Mode</p>
              <p class="text-sm font-medium">{pair.modeAsset.name}</p>
            </div>
          </div>
        </div>
        
        <!-- Center action button -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            class="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-medium shadow-lg"
            on:click={() => console.log('Add pair to playlist')}
          >
            + Add Pair
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
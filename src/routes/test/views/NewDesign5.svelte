<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all"
    >
      <!-- Map section -->
      <div class="relative h-32">
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div class="absolute bottom-2 left-2 text-white">
          <p class="text-xs opacity-70">Map</p>
          <p class="font-medium">{pair.mapAsset.name}</p>
        </div>
        <button
          class="absolute top-2 right-2 px-3 py-1 bg-blue-500/80 hover:bg-blue-500 text-white text-xs rounded transition-colors"
          on:click={() => console.log('Go to map')}
        >
          View →
        </button>
      </div>
      
      <!-- Divider -->
      <div class="h-px -700"></div>
      
      <!-- Mode section -->
      <div class="relative h-32">
        <img
          src={pair.modeAsset.thumbnailUrl}
          alt={pair.modeAsset.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div class="absolute bottom-2 left-2 text-white">
          <p class="text-xs opacity-70">Mode</p>
          <p class="font-medium">{pair.modeAsset.name}</p>
        </div>
        <button
          class="absolute top-2 right-2 px-3 py-1 bg-purple-500/80 hover:bg-purple-500 text-white text-xs rounded transition-colors"
          on:click={() => console.log('Go to mode')}
        >
          View →
        </button>
      </div>
      
      <!-- Bottom action bar -->
      <div class="p-3 -900/50">
        <button 
          class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors font-medium text-sm"
          on:click={() => console.log('Add pair to playlist')}
        >
          Add Pair to Playlist
        </button>
      </div>
    </div>
  {/each}
</div>
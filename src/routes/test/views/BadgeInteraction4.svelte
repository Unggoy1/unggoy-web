<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden group cursor-pointer"
    >
      <div class="aspect-video relative">
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode badge with icon -->
        <div class="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
          <div class="w-10 h-10 rounded-lg overflow-hidden">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <p class="text-white text-sm font-medium">{pair.modeAsset.name}</p>
            <p class="text-white/60 text-xs">Game Mode</p>
          </div>
        </div>
        
        <!-- Map name at bottom -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 class="text-white font-bold text-lg">{pair.mapAsset.name}</h3>
        </div>
        
        <!-- Hover overlay with quick actions -->
        <div class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            class="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="View Map"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button 
            class="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="View Mode"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button 
            class="p-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            title="Add to Playlist"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            class="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="More Options"
          >
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
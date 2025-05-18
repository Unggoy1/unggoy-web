<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all group"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Map as primary background -->
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Gradient overlay for better text contrast -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
        
        <!-- Mode badge in corner -->
        <div class="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full pr-3 overflow-hidden">
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-white text-sm font-medium">{pair.modeAsset.name}</span>
        </div>
        
        <!-- Three dots menu -->
        <button
          class="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('Menu clicked');
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Text on gradient -->
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white font-bold text-lg">{pair.mapAsset.name}</h3>
          <p class="text-white/90 text-sm">Paired Playlist</p>
        </div>
      </div>
    </div>
  {/each}
</div>
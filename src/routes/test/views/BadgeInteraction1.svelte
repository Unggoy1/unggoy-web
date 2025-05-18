<script>
  export let pairs;
  export let onSelect;
  
  let openMenu = null;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair, index}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode badge -->
        <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-1 flex items-center gap-2">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-12 h-8 object-cover rounded"
          />
          <span class="text-white text-sm font-medium px-2">{pair.modeAsset.name}</span>
        </div>
        
        <!-- Bottom bar with three dots -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
          <div>
            <h3 class="text-white font-medium">{pair.mapAsset.name}</h3>
            <p class="text-white/70 text-sm">Playlist Pair</p>
          </div>
          <div class="relative">
            <button
              on:click={(e) => {
                e.stopPropagation();
                openMenu = openMenu === index ? null : index;
              }}
              class="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            {#if openMenu === index}
              <div class="absolute bottom-full right-0 mb-2 w-48 -800 rounded-lg shadow-lg overflow-hidden">
                <button class="w-full px-4 py-2 text-left hover:-700 text-white text-sm">
                  View Map →
                </button>
                <button class="w-full px-4 py-2 text-left hover:-700 text-white text-sm">
                  View Mode →
                </button>
                <div class="h-px -700"></div>
                <button class="w-full px-4 py-2 text-left hover:-700 text-white text-sm">
                  Add to Playlist
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
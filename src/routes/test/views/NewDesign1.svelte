<script>
  export let pairs;
  export let onSelect;
  
  let openMenu = null;

  function handleMenuClick(e, pairIndex) {
    e.stopPropagation();
    openMenu = openMenu === pairIndex ? null : pairIndex;
  }

  function handleMenuAction(action, pair) {
    console.log(action, pair);
    openMenu = null;
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair, index}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Split image display -->
        <div class="absolute inset-0 flex">
          <div class="w-1/2">
            <img
              src={pair.mapAsset.thumbnailUrl}
              alt={pair.mapAsset.name}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-1/2">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute inset-y-0 left-1/2 w-px bg-white/20"></div>
        </div>
        
        <!-- Three dots menu -->
        <div class="absolute top-2 right-2">
          <button
            class="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            on:click={(e) => handleMenuClick(e, index)}
          >
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          
          <!-- Dropdown menu -->
          {#if openMenu === index}
            <div class="absolute right-0 mt-2 w-64 -700 rounded-lg shadow-lg overflow-hidden z-50">
              <button
                class="w-full px-4 py-3 text-left hover:-600 transition-colors text-white text-sm flex items-center gap-2"
                on:click={() => handleMenuAction('addPair', pair)}
              >
                <span class="text-green-400">+</span> Add pair to playlist
              </button>
              <div class="h-px -600"></div>
              <button
                class="w-full px-4 py-3 text-left hover:-600 transition-colors text-white text-sm flex items-center gap-2"
                on:click={() => handleMenuAction('addMap', pair.mapAsset)}
              >
                <span class="text-blue-400">+</span> Add map to playlist
              </button>
              <button
                class="w-full px-4 py-3 text-left hover:-600 transition-colors text-white text-sm flex items-center gap-2"
                on:click={() => handleMenuAction('addMode', pair.modeAsset)}
              >
                <span class="text-purple-400">+</span> Add mode to playlist
              </button>
              <div class="h-px -600"></div>
              <button
                class="w-full px-4 py-3 text-left hover:-600 transition-colors text-white text-sm"
                on:click={() => handleMenuAction('copyMapLink', pair.mapAsset)}
              >
                Copy map link
              </button>
              <button
                class="w-full px-4 py-3 text-left hover:-600 transition-colors text-white text-sm"
                on:click={() => handleMenuAction('copyModeLink', pair.modeAsset)}
              >
                Copy mode link
              </button>
            </div>
          {/if}
        </div>
        
        <!-- Bottom gradient and text -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div class="text-center">
            <p class="text-white font-medium text-lg">{pair.mapAsset.name}</p>
            <p class="text-slate-300 text-sm">{pair.modeAsset.name}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
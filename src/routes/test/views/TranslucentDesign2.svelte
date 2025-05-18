<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Split background -->
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
          <div class="absolute inset-y-0 left-1/2 w-0.5 bg-black/30"></div>
        </div>
        
        <!-- Three dots menu -->
        <button
          class="absolute top-2 right-2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('Menu clicked');
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Translucent bar with split info -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
          <div class="flex">
            <div class="flex-1 px-3 py-3 border-r border-white/10">
              <p class="text-white/70 text-xs mb-0.5">Map</p>
              <p class="text-white font-medium text-sm leading-tight truncate">{pair.mapAsset.name}</p>
            </div>
            <div class="flex-1 px-3 py-3">
              <p class="text-white/70 text-xs mb-0.5">Mode</p>
              <p class="text-white font-medium text-sm leading-tight truncate">{pair.modeAsset.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
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
        <!-- Base map image -->
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode image overlay -->
        <div class="absolute top-2 left-2 w-1/3 h-1/3 rounded-lg overflow-hidden ring-2 ring-white/50">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Three dots menu -->
        <button
          class="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('Menu clicked for:', pair);
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Bottom gradient and text -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p class="text-white/70 text-xs mb-1">Map + Mode</p>
          <p class="text-white font-medium">{pair.mapAsset.name} + {pair.modeAsset.name}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
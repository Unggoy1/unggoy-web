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
        <!-- Full pair image with mode overlay -->
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode thumbnail in corner -->
        <div class="absolute top-2 right-2 w-20 h-14 rounded overflow-hidden ring-1 ring-white/30">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Three dots menu -->
        <button
          class="absolute top-2 left-2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('Menu clicked');
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Translucent bar with text -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-3">
          <h3 class="text-white font-medium text-base leading-tight">{pair.mapAsset.name}</h3>
          <p class="text-white/80 text-sm">with {pair.modeAsset.name}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
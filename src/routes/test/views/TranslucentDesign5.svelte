<script>
  export let pairs;
  export let onSelect;
</script>

<style>
  .diagonal-split {
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
  }
</style>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Diagonal split background -->
        <div class="absolute inset-0">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        <div class="absolute inset-0 diagonal-split">
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
            console.log('Menu clicked');
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Stacked translucent bars -->
        <div class="absolute bottom-0 left-0 right-0">
          <div class="bg-black/60 backdrop-blur-sm px-4 py-2">
            <p class="text-white/70 text-xs">Map</p>
            <p class="text-white font-medium text-sm">{pair.mapAsset.name}</p>
          </div>
          <div class="bg-black/70 backdrop-blur-sm px-4 py-2">
            <p class="text-white/70 text-xs">Mode</p>
            <p class="text-white font-medium text-sm">{pair.modeAsset.name}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
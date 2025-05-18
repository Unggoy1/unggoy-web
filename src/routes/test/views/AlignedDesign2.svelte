<script>
  export let pairs;
  export let onSelect;
</script>

<style>
  .diagonal-split {
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
</style>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative overflow-hidden">
        <!-- Map image (bottom-left triangle) -->
        <div class="absolute inset-0">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Mode image (top-right triangle) -->
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
            console.log('Menu clicked for:', pair);
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Labels -->
        <div class="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded">
          <p class="text-white text-sm font-medium">{pair.mapAsset.name}</p>
        </div>
        <div class="absolute top-2 right-12 bg-black/70 px-2 py-1 rounded">
          <p class="text-white text-sm font-medium">{pair.modeAsset.name}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
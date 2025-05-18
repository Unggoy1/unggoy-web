<script>
  export let pairs;
  export let onSelect;
  
  let selectedPair = null;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair, index}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
      on:click={() => selectedPair = pair}
    >
      <div class="aspect-video relative">
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode badge -->
        <div class="absolute top-3 left-3 bg-purple-500/80 backdrop-blur-sm rounded-full pl-1 pr-3 py-1 flex items-center gap-2">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-8 h-8 object-cover rounded-full"
          />
          <span class="text-white text-sm font-medium">{pair.modeAsset.name}</span>
        </div>
        
        <!-- Bottom gradient -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 class="text-white font-medium text-lg">{pair.mapAsset.name}</h3>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Mini Modal -->
{#if selectedPair}
  <div 
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    on:click={() => selectedPair = null}
  >
    <div 
      class="-800 rounded-lg p-4 max-w-md w-full"
      on:click|stopPropagation
    >
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <img
            src={selectedPair.mapAsset.thumbnailUrl}
            alt={selectedPair.mapAsset.name}
            class="w-full h-24 object-cover rounded-lg mb-2"
          />
          <p class="text-white font-medium">{selectedPair.mapAsset.name}</p>
          <p class="text-slate-400 text-sm">Map</p>
        </div>
        <div class="flex-1">
          <img
            src={selectedPair.modeAsset.thumbnailUrl}
            alt={selectedPair.modeAsset.name}
            class="w-full h-24 object-cover rounded-lg mb-2"
          />
          <p class="text-white font-medium">{selectedPair.modeAsset.name}</p>
          <p class="text-slate-400 text-sm">Mode</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          View Map
        </button>
        <button class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          View Mode
        </button>
      </div>
    </div>
  </div>
{/if}
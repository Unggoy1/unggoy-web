<script>
  export let pairs;
  export let onSelect;
  
  let expandedCard = null;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair, index}
    <div
      class={`relative -800 rounded-lg overflow-hidden transition-all duration-300 ${
        expandedCard === index ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div 
        class="aspect-video relative cursor-pointer"
        on:click={() => expandedCard = expandedCard === index ? null : index}
      >
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode overlay badge -->
        <div class="absolute top-3 right-3 w-20 h-14 rounded-lg overflow-hidden ring-2 ring-white/30">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Bottom info -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
          <h3 class="text-white font-medium">{pair.mapAsset.name}</h3>
          <p class="text-white/70 text-sm">{pair.modeAsset.name}</p>
        </div>
      </div>

      <!-- Expanded content -->
      {#if expandedCard === index}
        <div class="p-4 -900/50 border-t border-slate-700">
          <div class="flex gap-4">
            <div class="flex-1">
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-2">
                Open Map →
              </button>
              <p class="text-slate-400 text-sm text-center">View in browser</p>
            </div>
            <div class="flex-1">
              <button class="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mb-2">
                Open Mode →
              </button>
              <p class="text-slate-400 text-sm text-center">View in browser</p>
            </div>
          </div>
          <button class="w-full mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add Pair to Playlist
          </button>
        </div>
      {/if}
    </div>
  {/each}
</div>
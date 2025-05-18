<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all"
    >
      <div 
        class="aspect-video relative cursor-pointer"
        on:click={() => onSelect(pair)}
      >
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white font-bold text-lg mb-1">{pair.mapAsset.name}</h3>
          <p class="text-slate-300 text-sm">{pair.modeAsset.name}</p>
        </div>
      </div>
      <div class="p-3 flex gap-2">
        <button 
          class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded text-sm transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('View map:', pair.mapAsset.name);
          }}
        >
          View Map
        </button>
        <button 
          class="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded text-sm transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('View mode:', pair.modeAsset.name);
          }}
        >
          View Mode
        </button>
      </div>
    </div>
  {/each}
</div>
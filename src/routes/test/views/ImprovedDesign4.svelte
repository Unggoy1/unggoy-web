<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 group transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Default state shows map -->
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        
        <!-- Mode image shown on hover -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex items-center justify-between mb-2">
            <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Map
            </span>
            <span class="bg-purple-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Mode
            </span>
          </div>
          <h3 class="text-white font-bold text-lg group-hover:opacity-0 transition-opacity">
            {pair.mapAsset.name}
          </h3>
          <h3 class="text-white font-bold text-lg opacity-0 group-hover:opacity-100 absolute transition-opacity">
            {pair.modeAsset.name}
          </h3>
          <p class="text-slate-300 text-sm mt-1">
            Click to select this pair
          </p>
        </div>
      </div>
    </div>
  {/each}
</div>
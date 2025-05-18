<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 group"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video flex">
        <div class="w-1/2 relative">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          <div class="absolute top-2 left-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
            Map
          </div>
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {pair.mapAsset.name}
          </div>
        </div>
        <div class="w-1/2 relative">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          <div class="absolute top-2 left-2 bg-purple-500/80 text-white text-xs px-2 py-1 rounded">
            Mode
          </div>
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {pair.modeAsset.name}
          </div>
        </div>
      </div>
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 rounded font-semibold transition-opacity">
          Select Pair
        </span>
      </div>
    </div>
  {/each}
</div>
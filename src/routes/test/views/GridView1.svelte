<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video">
        <div class="h-1/2 relative">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Map
          </div>
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {pair.mapAsset.name}
          </div>
        </div>
        <div class="h-1/2 relative">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div class="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
            Mode
          </div>
          <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
            {pair.modeAsset.name}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
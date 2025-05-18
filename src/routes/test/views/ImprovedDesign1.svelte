<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="p-4">
        <h3 class="text-white font-semibold mb-3">Map + Mode Pair</h3>
        <div class="flex gap-4">
          <div class="flex-1">
            <img
              src={pair.mapAsset.thumbnailUrl}
              alt={pair.mapAsset.name}
              class="w-full h-24 object-cover rounded mb-2"
            />
            <p class="text-xs text-slate-400">Map</p>
            <p class="text-sm text-white font-medium">{pair.mapAsset.name}</p>
          </div>
          <div class="flex-1">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-24 object-cover rounded mb-2"
            />
            <p class="text-xs text-slate-400">Mode</p>
            <p class="text-sm text-white font-medium">{pair.modeAsset.name}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
<script>
  export let pairs;
  export let onSelect;
  export let double = false;
</script>

{#if double}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
    {#each pairs as pair}
      <div
        class="-800 rounded-lg p-2.5 flex items-center gap-3 hover:-700 cursor-pointer"
        on:click={() => onSelect(pair)}
      >
        <div class="flex items-center gap-3 flex-1">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-24 h-16 object-cover rounded"
          />
          <div class="min-w-0">
            <h3 class="font-semibold text-white text-base truncate">
              {pair.mapAsset.name}
            </h3>
            <p class="text-slate-400 text-sm">Map</p>
          </div>
        </div>

        <div class="flex items-center gap-3 flex-1">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-24 h-16 object-cover rounded"
          />
          <div class="min-w-0">
            <h3 class="font-semibold text-white text-base truncate">
              {pair.modeAsset.name}
            </h3>
            <p class="text-slate-400 text-sm">Mode</p>
          </div>
        </div>

        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm opacity-0 hover:opacity-100 transition-opacity">
          Select
        </button>
      </div>
    {/each}
  </div>
{:else}
  <div class="space-y-1">
    {#each pairs as pair}
      <div
        class="-800 rounded-lg p-3 flex items-center gap-4 hover:-700 cursor-pointer"
        on:click={() => onSelect(pair)}
      >
        <div class="flex items-center gap-4 flex-1">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-32 h-20 object-cover rounded"
          />
          <div>
            <h3 class="font-semibold text-white">{pair.mapAsset.name}</h3>
            <p class="text-slate-400 text-xs">Map</p>
          </div>
        </div>

        <div class="flex items-center gap-3 flex-1">
          <img
            src={pair.modeAsset.thumbnailUrl}
            alt={pair.modeAsset.name}
            class="w-32 h-20 object-cover rounded"
          />
          <div>
            <h3 class="font-semibold text-white">
              {pair.modeAsset.name}
            </h3>
            <p class="text-slate-400 text-xs">Mode</p>
          </div>
        </div>

        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm opacity-0 hover:opacity-100 transition-opacity">
          Select
        </button>
      </div>
    {/each}
  </div>
{/if}
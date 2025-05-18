<script>
  export let pair;
  export let isOpen;
  export let onClose;
  export let onNavigateToMap;
  export let onNavigateToMode;
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 -800 border-b border-slate-700 p-4 flex justify-between items-center">
        <h2 class="text-xl font-bold text-white">Map + Mode Pair Details</h2>
        <button
          on:click={onClose}
          class="text-slate-400 hover:text-white p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Hero Image -->
        <div class="relative aspect-video mb-6 rounded-lg overflow-hidden">
          <div class="absolute inset-0 flex">
            <div class="w-1/2">
              <img
                src={pair.mapAsset.thumbnailUrl}
                alt={pair.mapAsset.name}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-1/2">
              <img
                src={pair.modeAsset.thumbnailUrl}
                alt={pair.modeAsset.name}
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
          <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <p class="text-white/80 text-sm mb-1">Map</p>
              <h3 class="text-white text-2xl font-bold">{pair.mapAsset.name}</h3>
            </div>
            <div class="text-right">
              <p class="text-white/80 text-sm mb-1">Mode</p>
              <h3 class="text-white text-2xl font-bold">{pair.modeAsset.name}</h3>
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Map Info -->
          <div class="-700/50 rounded-lg p-4">
            <h4 class="text-white font-semibold mb-3">Map Information</h4>
            <ul class="space-y-2 text-sm text-slate-300">
              <li>• Map ID: {pair.mapAsset.assetId}</li>
              <li>• Type: Multiplayer Map</li>
              <li>• Author: Community Creator</li>
              <li>• Downloads: 1,234</li>
            </ul>
            <button
              on:click={() => onNavigateToMap(pair.mapAsset)}
              class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              View Map Details →
            </button>
          </div>

          <!-- Mode Info -->
          <div class="-700/50 rounded-lg p-4">
            <h4 class="text-white font-semibold mb-3">Mode Information</h4>
            <ul class="space-y-2 text-sm text-slate-300">
              <li>• Mode ID: {pair.modeAsset.assetId}</li>
              <li>• Type: Game Variant</li>
              <li>• Players: 4-16</li>
              <li>• Team Size: 4v4</li>
            </ul>
            <button
              on:click={() => onNavigateToMode(pair.modeAsset)}
              class="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              View Mode Details →
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4">
          <button class="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition-colors font-semibold">
            Add Pair to Playlist
          </button>
          <button class="flex-1 -600 hover:-700 text-white px-6 py-3 rounded transition-colors font-semibold">
            Create New Playlist with Pair
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
<script>
  export let pairs;
  export let onSelect;
  
  let flippedCard = null;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair, index}
    <div
      class="relative h-64 preserve-3d"
      style="perspective: 1000px;"
    >
      <div
        class={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${
          flippedCard === index ? 'rotate-y-180' : ''
        }`}
        on:click={() => flippedCard = flippedCard === index ? null : index}
      >
        <!-- Front of card -->
        <div class="absolute inset-0 w-full h-full backface-hidden">
          <div class="h-full -800 rounded-lg overflow-hidden">
            <div class="aspect-video relative">
              <img
                src={pair.mapAsset.thumbnailUrl}
                alt={pair.mapAsset.name}
                class="w-full h-full object-cover"
              />
              
              <!-- Floating mode badge -->
              <div class="absolute -bottom-4 right-4 bg-purple-500 rounded-full p-1 shadow-lg">
                <img
                  src={pair.modeAsset.thumbnailUrl}
                  alt={pair.modeAsset.name}
                  class="w-16 h-16 object-cover rounded-full"
                />
              </div>
              
              <!-- Bottom info -->
              <div class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 pr-24">
                <h3 class="text-white font-medium">{pair.mapAsset.name}</h3>
                <p class="text-white/70 text-sm">Click to view options</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back of card -->
        <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div class="h-full -900 rounded-lg p-6 flex flex-col justify-center">
            <h3 class="text-white font-bold text-lg mb-4 text-center">Playlist Options</h3>
            <div class="space-y-3">
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                View Map
              </button>
              <button class="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                View Mode
              </button>
              <button class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to Playlist
              </button>
            </div>
            <p class="text-slate-400 text-sm mt-4 text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
</style>
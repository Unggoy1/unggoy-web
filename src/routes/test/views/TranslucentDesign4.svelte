<script>
  export let pairs;
  export let onSelect;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="relative -800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
      on:click={() => onSelect(pair)}
    >
      <div class="aspect-video relative">
        <!-- Blended background using both images -->
        <div class="absolute inset-0">
          <img
            src={pair.mapAsset.thumbnailUrl}
            alt={pair.mapAsset.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 mix-blend-overlay">
            <img
              src={pair.modeAsset.thumbnailUrl}
              alt={pair.modeAsset.name}
              class="w-full h-full object-cover opacity-30"
            />
          </div>
        </div>
        
        <!-- Dark overlay for contrast -->
        <div class="absolute inset-0 bg-black/30"></div>
        
        <!-- Three dots menu -->
        <button
          class="absolute top-2 right-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          on:click={(e) => {
            e.stopPropagation();
            console.log('Menu clicked');
          }}
        >
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <!-- Translucent info bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div class="px-4 py-3">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-white font-semibold text-base">{pair.mapAsset.name}</h3>
                <p class="text-white/80 text-sm flex items-center gap-1">
                  <span class="inline-block w-1 h-1 rounded-full bg-white/60"></span>
                  {pair.modeAsset.name}
                </p>
              </div>
              <div class="text-white/60">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
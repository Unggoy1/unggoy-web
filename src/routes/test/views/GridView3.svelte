<script>
  export let pairs;
  export let onSelect;
</script>

<style>
  .vertical-card {
    aspect-ratio: 1/1;
    position: relative;
    overflow: hidden;
  }
  
  .vertical-split-image {
    position: absolute;
    width: 100%;
    height: 50%;
    transition: height 0.3s ease;
  }
  
  .vertical-left {
    top: 0;
  }
  
  .vertical-right {
    bottom: 0;
  }
  
  .vertical-card:hover .vertical-left {
    height: 60%;
  }
  
  .vertical-card:hover .vertical-right {
    height: 60%;
  }
</style>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each pairs as pair}
    <div
      class="vertical-card -800 rounded-lg overflow-hidden cursor-pointer"
      on:click={() => onSelect(pair)}
    >
      <!-- Map Section -->
      <div class="vertical-split-image vertical-left">
        <img
          src={pair.mapAsset.thumbnailUrl}
          alt={pair.mapAsset.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div class="absolute top-2 left-2">
          <div class="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Map
          </div>
        </div>
        <div class="absolute bottom-2 left-2 text-white text-sm font-medium">
          {pair.mapAsset.name}
        </div>
      </div>

      <!-- Mode Section -->
      <div class="vertical-split-image vertical-right">
        <img
          src={pair.modeAsset.thumbnailUrl}
          alt={pair.modeAsset.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div class="absolute top-2 right-2">
          <div class="bg-purple-500 text-white text-xs px-2 py-1 rounded">
            Mode
          </div>
        </div>
        <div class="absolute bottom-2 right-2 text-white text-sm font-medium">
          {pair.modeAsset.name}
        </div>
      </div>
    </div>
  {/each}
</div>
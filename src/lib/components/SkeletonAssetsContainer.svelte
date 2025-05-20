<script lang="ts">
  import SkeletonAssetCard from './SkeletonAssetCard.svelte';
  
  export let count = 12; // Default number of skeleton cards to display
</script>

<div class="skeleton-assets-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each Array(count) as _, i}
    <SkeletonAssetCard />
  {/each}
</div>
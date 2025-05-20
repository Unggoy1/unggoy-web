<script lang="ts">
  export let width = "100%";
  export let height = "300px";
</script>

<div 
  class="skeleton-asset-card bg-gray-800 rounded-lg overflow-hidden animate-pulse" 
  style="width: {width}; height: {height};"
>
  <div class="skeleton-image bg-gray-700 h-40"></div>
  <div class="p-3">
    <div class="skeleton-title bg-gray-700 h-6 w-3/4 rounded mb-3"></div>
    <div class="skeleton-details">
      <div class="skeleton-detail bg-gray-700 h-4 w-1/2 rounded mb-2"></div>
      <div class="skeleton-detail bg-gray-700 h-4 w-1/3 rounded mb-2"></div>
      <div class="skeleton-detail bg-gray-700 h-4 w-1/4 rounded"></div>
    </div>
  </div>
</div>

<style>
  .skeleton-asset-card {
    position: relative;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
</style>
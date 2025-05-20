<script lang="ts">
  // Props to control dimensions if needed
  export let width = "100%";
</script>

<div class="main-container show">
  <div class="asset-area">
    <div class="asset-container">
      <div class="asset-container">
        <!-- Main image skeleton -->
        <div class="skeleton-asset-img-lg skeleton-pulse bg-gray-700" 
             style="width: {width}; height: 267px; border-radius: 8px;"></div>
        
        <!-- Skeleton for carousel/previews -->
        <div class="asset-img-sm-wrapper">
          <div class="skeleton-carousel flex gap-2 mt-2">
            {#each Array(4) as _, i}
              <div class="skeleton-thumbnail skeleton-pulse bg-gray-700" 
                   style="width: 60px; height: 40px; border-radius: 4px;"></div>
            {/each}
          </div>
        </div>
      </div>

      <div class="asset-detail">
        <div class="asset-content">
          <!-- Title skeleton -->
          <div class="skeleton-title skeleton-pulse bg-gray-700" 
               style="height: 32px; width: 70%; margin-bottom: 16px; border-radius: 4px;"></div>
          
          <!-- Description skeleton - multiple lines -->
          <div class="skeleton-description">
            <div class="skeleton-line skeleton-pulse bg-gray-700" 
                 style="height: 18px; width: 100%; margin-bottom: 8px; border-radius: 4px;"></div>
            <div class="skeleton-line skeleton-pulse bg-gray-700" 
                 style="height: 18px; width: 95%; margin-bottom: 8px; border-radius: 4px;"></div>
            <div class="skeleton-line skeleton-pulse bg-gray-700" 
                 style="height: 18px; width: 90%; margin-bottom: 8px; border-radius: 4px;"></div>
            <div class="skeleton-line skeleton-pulse bg-gray-700" 
                 style="height: 18px; width: 85%; border-radius: 4px;"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="asset-aside">
      <div class="asset-details">
        <!-- Asset details header skeleton -->
        <div class="asset-header-container">
          <div class="skeleton-header skeleton-pulse bg-gray-700" 
               style="height: 24px; width: 60%; margin-bottom: 16px; border-radius: 4px;"></div>
        </div>
        
        <!-- Asset details lines -->
        {#each Array(6) as _, i}
          <div class="aside-text flex items-center mb-3">
            <div class="skeleton-icon skeleton-pulse bg-gray-700" 
                 style="height: 20px; width: 20px; margin-right: 10px; border-radius: 4px;"></div>
            <div class="skeleton-detail-text skeleton-pulse bg-gray-700" 
                 style="height: 18px; width: 100px; border-radius: 4px;"></div>
          </div>
        {/each}
      </div>
      
      <!-- Tags section skeleton -->
      <div class="asside-container-wrapper mt-4">
        <div class="aside-container">
          <div class="skeleton-aside-title skeleton-pulse bg-gray-700" 
               style="height: 20px; width: 80px; margin-bottom: 12px; border-radius: 4px;"></div>
          
          <div class="skeleton-tags flex flex-wrap gap-2">
            {#each Array(5) as _, i}
              <div class="skeleton-tag skeleton-pulse bg-gray-700" 
                   style="height: 24px; width: 60px; border-radius: 12px;"></div>
            {/each}
          </div>
        </div>
        
        <!-- Contributors section skeleton -->
        <div class="aside-container mt-4">
          <div class="skeleton-aside-title skeleton-pulse bg-gray-700" 
               style="height: 20px; width: 100px; margin-bottom: 12px; border-radius: 4px;"></div>
          
          {#each Array(3) as _, i}
            <div class="contributor-container flex items-center mb-3">
              <div class="skeleton-contributor-img skeleton-pulse bg-gray-700" 
                   style="height: 40px; width: 40px; margin-right: 10px; border-radius: 50%;"></div>
              <div>
                <div class="skeleton-contributor-name skeleton-pulse bg-gray-700" 
                     style="height: 18px; width: 120px; margin-bottom: 4px; border-radius: 4px;"></div>
                <div class="skeleton-contributor-tag skeleton-pulse bg-gray-700" 
                     style="height: 14px; width: 40px; border-radius: 4px;"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* You can add additional styling here or rely on global skeleton classes */
  .skeleton-carousel {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
  
  .items-center {
    align-items: center;
  }
  
  .gap-2 {
    gap: 8px;
  }
  
  .mt-2 {
    margin-top: 8px;
  }
  
  .mt-4 {
    margin-top: 16px;
  }
  
  .mb-3 {
    margin-bottom: 12px;
  }
</style>
<script>
  export let pair;
  
  // Determine which asset is the primary display (always show map as primary if it exists)
  $: primaryAsset = pair.map || pair.gamemode;
  $: secondaryAsset = pair.map && pair.gamemode ? pair.gamemode : null;
  
  // Safety check - skip rendering if no primary asset
  $: hasValidAsset = !!primaryAsset;
  
  // Format plays count
  function formatPlays(count) {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  }
</script>

<a href="/{primaryAsset.assetKind === 2 ? 'maps' : primaryAsset.assetKind === 6 ? 'modes' : 'prefabs'}/{primaryAsset.assetId}" class="card-link">
  <div class="card">
    <div class="card-image">
      <img src={primaryAsset.thumbnailUrl} alt={primaryAsset.name} />
      <div class="play-count">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 2L10 6L3 10V2Z" fill="currentColor"/>
        </svg>
        {formatPlays(primaryAsset.playsAllTime)}
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{primaryAsset.name}</h3>
      <p class="card-owner">{primaryAsset.owner}</p>
      
      {#if secondaryAsset}
        <div class="gamemode-chip">
          <img 
            src={secondaryAsset.thumbnailUrl} 
            alt={secondaryAsset.name} 
            class="chip-thumbnail"
          />
          <span class="chip-name">{secondaryAsset.name}</span>
        </div>
      {:else}
        <!-- Show the regular asset type chip when there's no secondary asset -->
        <div class="asset-type-chip" data-type={primaryAsset.assetKind}>
          {primaryAsset.assetKind === 2 ? 'Map' : 'Mode'}
        </div>
      {/if}
    </div>
  </div>
</a>

<style>
  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  .card {
    background-color: var(--top-container-bg);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    position: relative;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
  }
  
  .card-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .play-count {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .card-content {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--container-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-owner {
    font-size: 0.875rem;
    color: var(--sidebar-color);
    margin: 0 0 12px 0;
  }
  
  /* Regular asset type chip (for unpaired items) */
  .asset-type-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background-color: #3b82f6;
    color: white;
    margin-top: auto;
  }
  
  .asset-type-chip[data-type="2"] {
    background-color: #3b82f6; /* Blue for maps */
  }
  
  .asset-type-chip[data-type="6"] {
    background-color: #8b5cf6; /* Purple for modes */
  }
  
  /* Gamemode chip (for paired items) */
  .gamemode-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 4px 4px;
    border-radius: 20px;
    background-color: rgba(139, 92, 246, 0.15); /* Purple translucent background */
    color: var(--container-color);
    font-size: 0.875rem;
    margin-top: auto;
    max-width: 100%;
    overflow: hidden;
  }
  
  .chip-thumbnail {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .chip-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
</style>
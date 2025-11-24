<script lang="ts">
  import LargeModal from './LargeModal.svelte';
  import { ugcBrowse, type UgcData, type UgcBrowseResponse } from '$lib/api/ugc';
  import { playlistAddAsset, type PlaylistData } from '$lib/api/playlist';
  import { MapSvg, ModeSvg, PrefabSvg } from '$lib/components/icons';
  import { onMount } from 'svelte';
  
  let modal: LargeModal;
  let playlist: PlaylistData | null = $state(null);
  let selectedAsset: UgcData | null = $state(null);
  let searchTerm: string = $state('');
  let currentPage: number = $state(1);
  let itemsPerPage: number = 8;
  
  // Asset type filter - default to all types (no filter)
  let assetKindFilter: number | undefined = $state(undefined);
  
  // Sorting options
  let sortBy: string = $state('playsAllTime');
  let sortOrder: 'asc' | 'desc' = $state('desc');
  
  // Loading states
  let loading = $state(false);
  let error = $state('');
  
  // Available assets from API
  let availableAssets: UgcData[] = $state([]);
  let totalResults: number = $state(0);
  let totalPages: number = $state(0);
  
  // Debounce timer for search
  let searchTimer: NodeJS.Timeout;
  
  // Keep track if this is the first load
  let isFirstLoad = true;

  // Mobile filter visibility
  let showFilters = $state(false);
  
  // Load assets from API based on current filters
  async function loadAssets() {
    // Don't set loading on first load to prevent empty state
    if (!isFirstLoad) {
      loading = true;
    }
    error = '';
    
    try {
      // Calculate offset based on current page
      const offset = (currentPage - 1) * itemsPerPage;
      
      const response: UgcBrowseResponse = await ugcBrowse({
        assetKind: assetKindFilter,
        sort: sortBy,
        order: sortOrder,
        count: itemsPerPage,
        offset,
        searchTerm: searchTerm || undefined
      });
      
      availableAssets = response.assets;
      totalResults = response.totalCount;
      totalPages = Math.ceil(response.totalCount / itemsPerPage);
      isFirstLoad = false;
    } catch (err) {
      error = 'Failed to load assets. Please try again.';
      console.error('Error loading assets:', err);
    } finally {
      loading = false;
    }
  }
  
  // Debounced search function
  function debouncedLoadAssets() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentPage = 1; // Reset to first page on new search
      loadAssets();
    }, 300); // 300ms delay
  }
  
  // Track previous values to prevent unnecessary API calls
  let prevSortBy = sortBy;
  let prevSortOrder = sortOrder;
  let prevSearchTerm = searchTerm;
  let prevAssetKindFilter = assetKindFilter;
  
  // Use $effect instead of $derived for side effects
  $effect(() => {
    if (modal && playlist) {
      // Check if search term changed
      if (searchTerm !== prevSearchTerm) {
        prevSearchTerm = searchTerm;
        debouncedLoadAssets();
      } 
      // Check if sort options changed
      else if (sortBy !== prevSortBy || sortOrder !== prevSortOrder) {
        prevSortBy = sortBy;
        prevSortOrder = sortOrder;
        currentPage = 1; // Reset to first page on sort change
        loadAssets();
      }
      // Check if asset kind filter changed
      else if (assetKindFilter !== prevAssetKindFilter) {
        prevAssetKindFilter = assetKindFilter;
        currentPage = 1;
        loadAssets();
      }
    }
  });
  
  export function open(playlistParam: PlaylistData) {
    playlist = playlistParam;
    selectedAsset = null;
    searchTerm = '';
    prevSearchTerm = '';
    assetKindFilter = undefined;
    prevAssetKindFilter = undefined;
    currentPage = 1;
    availableAssets = [];
    totalResults = 0;
    totalPages = 0;
    isFirstLoad = true;
    modal.open();
    
    // Load assets immediately
    loadAssets();
  }
  
  function cancel() {
    modal.close();
  }
  
  async function save(keepOpen = false) {
    if (playlist && selectedAsset) {
      try {
        await playlistAddAsset({
          playlistId: playlist.assetId,
          assetId: selectedAsset.assetId,
          name: playlist.name
        });
        
        if (keepOpen) {
          // Reset selection but keep modal open
          selectedAsset = null;
        } else {
          modal.close();
        }
      } catch (err) {
        error = 'Failed to add asset to playlist. Please try again.';
        console.error('Error adding asset:', err);
      }
    }
  }
  
  function selectAsset(asset: UgcData) {
    selectedAsset = asset;
  }
  
  function changePage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      currentPage = newPage;
      loadAssets();
    }
  }
</script>

<LargeModal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">
    Add Assets to Playlist
  </h3>
  
  <div class="modal-content">
    {#if playlist}
      <div class="selected-asset">
        <img src={playlist.thumbnailUrl || '/placeholder.webp'} alt={playlist.name} class="asset-thumbnail" />
        <div class="asset-info">
          <h4>{playlist.name}</h4>
          <p class="selected-asset-label">Selected Playlist</p>
        </div>
      </div>
    {/if}
    
    <!-- Always show the browse section container for consistent height -->
    <div class="browse-section active">
      <h4 class="text-sm font-medium mb-3">
        Select Asset
      </h4>
      
      <!-- Controls Bar -->
      <div class="controls-bar">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search assets..."
          class="search-input"
        />

        <button
          class="filter-toggle-btn"
          onclick={() => showFilters = !showFilters}
          title="Toggle filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </button>

        <div class="controls-right" class:show={showFilters}>
          <select bind:value={assetKindFilter} class="sort-select">
            <option value={undefined}>All Types</option>
            <option value={2}>Maps</option>
            <option value={6}>Modes</option>
            <option value={4}>Prefabs</option>
          </select>

          <select bind:value={sortBy} class="sort-select">
            <option value="publishedAt">Date Published</option>
            <option value="name">Name</option>
            <option value="averageRating">Rating</option>
            <option value="bookmarks">Bookmarks</option>
            <option value="playsRecent">Plays Recent</option>
            <option value="playsAllTime">Plays</option>
          </select>

          <button
            onclick={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}
            class="sort-order-btn"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      <!-- Selected Asset Display -->
      {#if selectedAsset}
        <div class="selected-for-pairing">
          <img src={selectedAsset.thumbnailUrl || '/placeholder.webp'} alt={selectedAsset.name} />
          <div>
            <p class="label">Selected Asset</p>
            <h4 class="name">{selectedAsset.name}</h4>
          </div>
        </div>
      {/if}
      
      <div class="content-container">
        {#if loading}
          <div class="loading-overlay">
            <div class="loading-content">
              <p>Loading assets...</p>
            </div>
          </div>
        {/if}
        
        {#if error}
          <div class="error-state">
            <p>{error}</p>
            <button onclick={() => loadAssets()} class="retry-btn">Try Again</button>
          </div>
        {:else if availableAssets.length > 0}
          <!-- Assets Grid -->
          <div class="assets-grid">
            {#each availableAssets as asset (asset.assetId)}
              <button
                class="asset-card"
                class:selected={selectedAsset?.assetId === asset.assetId}
                onclick={() => selectAsset(asset)}
                title={asset.name}
              >
                <img src={asset.thumbnailUrl || '/placeholder.webp'} alt={asset.name} />
                <div class="asset-card-info">
                  <div class="asset-title-row">
                    {#if asset.assetKind === 2}
                      <MapSvg active={false} />
                    {:else if asset.assetKind === 6}
                      <ModeSvg active={false} />
                    {:else if asset.assetKind === 4}
                      <PrefabSvg active={false} />
                    {/if}
                    <p class="asset-owner">{asset.name}</p>
                  </div>
                </div>
              </button>
            {/each}
          </div>
          
          <!-- Pagination -->
          {#if totalPages > 1}
            <div class="pagination">
              <button 
                onclick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                class="page-btn"
              >
                ←
              </button>
              <span class="page-info">{currentPage} / {totalPages}</span>
              <button 
                onclick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                class="page-btn"
              >
                →
              </button>
            </div>
          {/if}
        {:else if !loading}
          <div class="no-results">
            <p>No assets found</p>
            {#if searchTerm || assetKindFilter}
              <button onclick={() => { searchTerm = ''; assetKindFilter = undefined; }} class="retry-btn">
                Clear Filters
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  {#snippet commands()}
    <div class="command-buttons">
      <button
        type="button"
        onclick={() => save(false)}
        disabled={!selectedAsset}
        class="primary-button"
      >
        Add & Finish
      </button>
      <button
        type="button"
        onclick={() => save(true)}
        disabled={!selectedAsset}
        class="primary-button add-another"
      >
        Add Another
      </button>
      <button
        type="button"
        onclick={cancel}
        class="primary-button"
      >
        Cancel
      </button>
    </div>
  {/snippet}
</LargeModal>

<style>
  .modal-content {
    width: 100%;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .modal-content {
      margin-top: 12px;
    }
  }
  
  .selected-asset {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: var(--top-container-bg);
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .asset-thumbnail {
    width: 80px;
    height: 45px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .asset-info h4 {
    font-weight: 600;
    margin: 0;
  }

  .selected-asset-label {
    font-size: 0.875rem;
    color: var(--sidebar-color);
  }
  
  .browse-section {
    margin-top: 24px;
    position: relative;
  }

  @media (max-width: 768px) {
    .browse-section {
      margin-top: 16px;
    }
  }
  
  .browse-section:not(.active) {
    visibility: hidden; /* Hide content but maintain space */
  }
  
  .browse-section.active {
    visibility: visible;
  }
  
  .controls-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .controls-bar {
      gap: 8px;
    }
  }

  .filter-toggle-btn {
    display: none;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
  }

  .filter-toggle-btn svg {
    stroke: var(--container-color);
  }

  .filter-toggle-btn:hover {
    background-color: var(--button-bg);
  }

  @media (max-width: 768px) {
    .filter-toggle-btn {
      display: flex;
    }
  }
  
  .search-input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .search-input {
      flex: 1 1 100%;
      min-width: 100%;
      font-size: 16px; /* Prevent iOS auto-zoom */
    }
  }
  
  .controls-right {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .controls-right {
      display: none;
      width: 100%;
      flex-direction: column;
      gap: 8px;
    }

    .controls-right.show {
      display: flex;
    }
  }
  
  .sort-select {
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .sort-select {
      width: 100%;
      font-size: 16px; /* Prevent iOS auto-zoom */
    }
  }
  
  .sort-order-btn {
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
    cursor: pointer;
    font-size: 16px;
  }
  
  .sort-order-btn:hover {
    background-color: var(--button-bg);
  }

  .selected-for-pairing {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: var(--button-bg);
    border: 2px solid var(--button-color);
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .selected-for-pairing img {
    width: 60px;
    height: 34px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .selected-for-pairing .label {
    font-size: 0.875rem;
    color: #a0aec0;
    margin: 0;
  }
  
  .selected-for-pairing .name {
    font-weight: 600;
    margin: 0;
  }
  
  .content-container {
    position: relative;
    min-height: 300px;
    max-height: 500px;
  }

  @media (max-width: 768px) {
    .content-container {
      min-height: 200px;
      max-height: 45vh; /* Reduced to leave room for buttons */
    }
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 8px;
  }
  
  .loading-content {
    text-align: center;
    background-color: var(--top-container-bg);
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .loading-content p {
    margin: 0;
    color: var(--container-color);
  }
  
  .error-state {
    text-align: center;
    padding: 40px;
    color: var(--sidebar-color);
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .retry-btn {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: var(--button-bg);
    color: var(--button-color);
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .retry-btn:hover {
    background-color: var(--button-bg-hover);
  }

  .no-results {
    text-align: center;
    padding: 40px;
    color: var(--sidebar-color);
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-rows: minmax(150px, auto);
    gap: 16px;
    max-height: 450px;
    overflow-y: auto;
    border: 1px solid var(--sidebar-bg);
    border-radius: 8px;
    padding: 16px;
  }

  @media (max-width: 768px) {
    .assets-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      max-height: 40vh; /* Reduced to leave room for buttons */
      gap: 12px;
      padding: 12px;
    }
  }

  @media (max-width: 480px) {
    .assets-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
  }

  .asset-card {
    background-color: var(--top-container-bg);
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .asset-card:hover {
    background-color: var(--button-bg);
  }

  .asset-card.selected {
    border-color: var(--button-color);
    background-color: var(--button-bg);
  }

  .asset-card img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 5px;
  }

  .asset-card-info {
    padding: 12px;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .asset-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .asset-title-row :global(svg) {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    fill: var(--sidebar-color);
  }

  .asset-owner {
    font-size: 0.875rem;
    color: var(--sidebar-color);
    margin: 0;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding: 0 8px;
  }

  .page-btn {
    padding: 6px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 4px;
    color: var(--container-color);
    cursor: pointer;
    font-size: 18px;
  }

  .page-btn:hover:not(:disabled) {
    background-color: var(--button-bg);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 0.875rem;
    color: var(--sidebar-color);
  }

  .primary-button {
    background-color: var(--button-bg);
    color: var(--button-color);
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: var(--button-bg-hover);
    color: var(--button-color-hover);
  }
  
  .primary-button:disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-color);
    cursor: not-allowed;
  }
  
  .command-buttons {
    display: flex;
    gap: 12px;
    flex-direction: row-reverse;
    margin-top: 0; /* Ensure no extra margin */
  }
  
  .add-another {
    margin-left: auto;
  }
</style>
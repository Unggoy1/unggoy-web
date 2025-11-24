<script lang="ts">
  import LargeModal from './LargeModal.svelte';
  import { ugcBrowse, type UgcData, type UgcBrowseResponse } from '$lib/api/ugc';
  import { playlistMe, playlistCreatePair, playlistUpdatePair, type PlaylistData, type PlaylistBrowseResponse, type PlaylistPair } from '$lib/api/playlist';
  import { onMount } from 'svelte';
  
  let modal: LargeModal;
  let asset: UgcData | null = null;
  let assetType: 'map' | 'mode' = 'map';
  let assetKind: number = 6; // 2 = Map, 6 = UgcGameVariant (mode)
  let selectedPlaylist: string = '';
  let selectedAsset: UgcData | null = null;
  let searchTerm: string = '';
  let currentPage: number = 1;
  let itemsPerPage: number = 8;
  
  // For update mode
  let isUpdateMode: boolean = false;
  let existingPair: PlaylistPair | null = null;
  let existingPairedAsset: UgcData | null = null;
  
  // Playlist dropdown state
  let playlistSearchTerm: string = '';
  let showPlaylistDropdown: boolean = false;
  let userPlaylists: PlaylistData[] = [];
  let filteredPlaylists: PlaylistData[] = [];
  let loadingPlaylists = false;
  
  // Sorting options
  let sortBy: string = 'playsAllTime';
  let sortOrder: 'asc' | 'desc' = 'desc';
  
  // Loading states
  let loading = false;
  let error = '';
  
  // Available assets from API
  let availableAssets: UgcData[] = [];
  let totalResults: number = 0;
  let totalPages: number = 0;
  
  // Debounce timer for search
  let searchTimer: NodeJS.Timeout;
  let playlistSearchTimer: NodeJS.Timeout;
  
  // Keep track if this is the first load
  let isFirstLoad = true;

  // Mobile filter visibility
  let showFilters = false;
  
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
        assetKind,
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
  
  // Load user playlists from API
  async function loadPlaylists() {
    loadingPlaylists = true;
    try {
      const response: PlaylistBrowseResponse = await playlistMe({
        searchTerm: playlistSearchTerm || undefined,
        count: 20 // Get up to 20 playlists, can increase if needed
      });
      userPlaylists = response.assets;
      filteredPlaylists = response.assets;
    } catch (err) {
      console.error('Error loading playlists:', err);
      userPlaylists = [];
      filteredPlaylists = [];
    } finally {
      loadingPlaylists = false;
    }
  }
  
  // Debounced playlist search
  function debouncedLoadPlaylists() {
    clearTimeout(playlistSearchTimer);
    playlistSearchTimer = setTimeout(() => {
      loadPlaylists();
    }, 300);
  }
  
  // Get selected playlist name
  $: selectedPlaylistName = userPlaylists.find(p => p.assetId === selectedPlaylist)?.name || '';

  // Load data when playlist is first selected
  let prevSelectedPlaylist = '';

  // Load assets when relevant filters change
  $: if (modal && selectedPlaylist) {
    // Check if playlist changed (initial load)
    if (selectedPlaylist !== prevSelectedPlaylist) {
      prevSelectedPlaylist = selectedPlaylist;
      currentPage = 1;
      loadAssets();
    }
    // Check if search term changed
    else if (searchTerm !== prevSearchTerm) {
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
  }
  
  export function open(selectedAssetParam: UgcData, pair?: PlaylistPair, playlistId?: string, pairedAsset?: UgcData) {
    asset = selectedAssetParam;
    
    // assetKind: 2 = Map, 6 = UgcGameVariant (mode)
    assetType = selectedAssetParam.assetKind === 2 ? 'map' : 'mode';
    
    // Update mode configuration
    isUpdateMode = !!pair;
    existingPair = pair || null;
    existingPairedAsset = pairedAsset || null;
    
    // Determine what we're browsing for based on asset type
    assetKind = assetType === 'map' ? 6 : 2; // Browse for modes if we have a map, maps if we have a mode
    
    selectedPlaylist = playlistId || '';
    prevSelectedPlaylist = selectedPlaylist;
    selectedAsset = pairedAsset || null;
    searchTerm = '';
    prevSearchTerm = '';
    currentPage = 1;
    availableAssets = [];
    totalResults = 0;
    totalPages = 0;
    isFirstLoad = true;
    playlistSearchTerm = '';
    showPlaylistDropdown = false;
    userPlaylists = [];
    filteredPlaylists = [];
    modal.open();
    
    // In update mode, load playlists and assets immediately since we have a pre-selected playlist
    if (isUpdateMode && selectedPlaylist) {
      loadPlaylists();
      loadAssets();
    }
  }
  
  function cancel() {
    modal.close();
  }
  
  async function save(keepOpen = false) {
    if (selectedPlaylist && selectedAsset && asset) {
      try {
        if (isUpdateMode && existingPair) {
          // Update existing pair
          const updatePayload = {
            playlistId: selectedPlaylist,
            pairId: existingPair.id
          };
          
          if (assetType === 'map') {
            updatePayload.gamemodeAssetId = selectedAsset.assetId;
          } else {
            updatePayload.mapAssetId = selectedAsset.assetId;
          }
          
          console.log('Updating pair with payload:', updatePayload);
          await playlistUpdatePair(updatePayload);
        } else {
          // Create new pair
          const payload = {
            playlistId: selectedPlaylist
          };
          
          if (assetType === 'map') {
            payload.mapAssetId = asset.assetId;
            payload.gamemodeAssetId = selectedAsset.assetId;
          } else {
            payload.gamemodeAssetId = asset.assetId;
            payload.mapAssetId = selectedAsset.assetId;
          }
          
          console.log('Creating pair with payload:', payload);
          await playlistCreatePair(payload);
        }
        
        if (keepOpen) {
          // Clear the selected asset but keep the modal open
          selectedAsset = null;
          searchTerm = '';
          prevSearchTerm = '';
          currentPage = 1;
          
          // Reset to create mode after successful update
          if (isUpdateMode) {
            isUpdateMode = false;
            existingPair = null;
            existingPairedAsset = null;
          }
          
          // Reload assets to ensure freshness
          loadAssets();
        } else {
          modal.close();
        }
      } catch (error) {
        console.error('Error saving pair:', error);
        // Error is already handled by toast in the API function
      }
    }
  }
  
  function selectAsset(assetItem: UgcData) {
    selectedAsset = assetItem;
  }
  
  function changePage(newPage: number) {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
      loadAssets();
    }
  }
</script>

<LargeModal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">
    {isUpdateMode ? 'Complete Pair' : 'Create Map-Mode Pair'}
  </h3>
  
  <div class="modal-content">
    {#if asset}
      <div class="selected-asset">
        <img src={asset.thumbnailUrl} alt={asset.name} class="asset-thumbnail" />
        <div class="asset-info">
          <h4>{asset.name}</h4>
          <p class="selected-asset-label">Selected {assetType === 'map' ? 'Map' : 'Mode'}</p>
        </div>
      </div>
      
      {#if isUpdateMode && existingPairedAsset}
        <div class="existing-pair-info">
          <p>Existing pair with:</p>
          <div class="selected-asset">
            <img src={existingPairedAsset.thumbnailUrl} alt={existingPairedAsset.name} class="asset-thumbnail" />
            <div class="asset-info">
              <h4>{existingPairedAsset.name}</h4>
              <p class="selected-asset-label">{assetType === 'map' ? 'Mode' : 'Map'}</p>
            </div>
          </div>
        </div>
      {/if}
    {/if}
    
    <div class="form-section">
      <label for="playlist-select" class="block text-sm font-medium mb-2">
        {isUpdateMode ? 'Playlist (Locked)' : 'Select Playlist'}
      </label>
      <div class="custom-dropdown">
        <input
          type="text"
          id="playlist-select"
          class="playlist-input"
          placeholder="Search playlists..."
          value={selectedPlaylistName || playlistSearchTerm}
          disabled={isUpdateMode}
          oninput={(e) => {
            if (!isUpdateMode) {
              playlistSearchTerm = e.target.value;
              if (selectedPlaylist && e.target.value !== selectedPlaylistName) {
                selectedPlaylist = '';
              }
              debouncedLoadPlaylists();
            }
          }}
          onfocus={() => {
            if (!isUpdateMode) {
              showPlaylistDropdown = true;
              if (userPlaylists.length === 0) {
                loadPlaylists();
              }
            }
          }}
          onblur={(e) => {
            if (!isUpdateMode) {
              // Delay to allow click on dropdown items
              setTimeout(() => {
                if (!e.relatedTarget?.classList.contains('playlist-item')) {
                  showPlaylistDropdown = false;
                }
              }, 200);
            }
          }}
        />
        
        {#if showPlaylistDropdown && (loadingPlaylists || filteredPlaylists.length > 0 || playlistSearchTerm)}
          <div class="dropdown-list">
            {#if loadingPlaylists}
              <div class="loading-playlists">Loading playlists...</div>
            {:else if filteredPlaylists.length > 0}
              {#each filteredPlaylists as playlist}
                <button
                  class="playlist-item"
                  class:selected={selectedPlaylist === playlist.assetId}
                  onclick={() => {
                    selectedPlaylist = playlist.assetId;
                    playlistSearchTerm = '';
                    showPlaylistDropdown = false;
                  }}
                  tabindex="-1"
                >
                  {playlist.name}
                </button>
              {/each}
            {:else}
              <div class="no-results">No playlists found</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Always show the browse section container for consistent height -->
    <div class={selectedPlaylist ? "browse-section active" : "browse-section"}>
      {#if selectedPlaylist}
        <h4 class="text-sm font-medium mb-3">
          Select {assetType === 'map' ? 'Mode' : 'Map'} to Pair
        </h4>
        
        <!-- Controls Bar -->
        <div class="controls-bar">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search {assetType === 'map' ? 'modes' : 'maps'}..."
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
            <img src={selectedAsset.thumbnailUrl} alt={selectedAsset.name} />
            <div>
              <p class="label">Selected for pairing:</p>
              <p class="name">{selectedAsset.name}</p>
            </div>
            <button onclick={() => selectedAsset = null} class="clear-btn">×</button>
          </div>
        {/if}
        
        <!-- Content Container with fixed height -->
        <div class="content-container">
          {#if error}
            <div class="error-state">
              <p>{error}</p>
              <button onclick={loadAssets} class="retry-btn">Retry</button>
            </div>
          {:else}
            <div class="assets-grid">
              {#each availableAssets as assetItem}
                <button
                  class="asset-card"
                  class:selected={selectedAsset?.assetId === assetItem.assetId}
                  onclick={() => selectAsset(assetItem)}
                  title={assetItem.name}
                >
                  <img src={assetItem.thumbnailUrl} alt={assetItem.name} />
                  <div class="asset-card-info">
                    <p class="asset-owner">{assetItem.name}</p>
                  </div>
                </button>
              {/each}
            </div>
            
            <!-- Loading overlay -->
            {#if loading}
              <div class="loading-overlay">
                <div class="loading-content">
                  <p>Loading {assetType === 'map' ? 'modes' : 'maps'}...</p>
                </div>
              </div>
            {/if}
          {/if}
        </div>
        
        <!-- Pagination outside content container -->
        {#if !loading && !error && totalPages > 1}
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
      {/if}
    </div>
  </div>
  
  {#snippet commands()}
    <div class="command-buttons">
      <button
        type="button"
        onclick={() => save(false)}
        disabled={!selectedPlaylist || !selectedAsset}
        class="primary-button"
      >
        Add Pair
      </button>
      <button
        type="button"
        onclick={() => save(true)}
        disabled={!selectedPlaylist || !selectedAsset}
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
    min-height: 750px; /* Restore original height */
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
  
  .form-section {
    margin-bottom: 20px;
  }
  
  .custom-dropdown {
    position: relative;
    width: 100%;
  }
  
  .playlist-input {
    width: 100%;
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
  }
  
  .playlist-input:focus {
    outline: none;
    border-color: var(--button-color);
  }
  
  .playlist-input:disabled {
    background-color: var(--sidebar-bg);
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 50;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .playlist-item {
    display: block;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
    background: none;
    border: none;
    color: var(--container-color);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .playlist-item:hover {
    background-color: var(--button-bg);
  }
  
  .playlist-item.selected {
    background-color: var(--button-bg);
    font-weight: 500;
  }
  
  .no-results {
    padding: 10px 12px;
    color: var(--sidebar-color);
    text-align: center;
  }
  
  .loading-playlists {
    padding: 10px 12px;
    color: var(--sidebar-color);
    text-align: center;
  }
  
  .browse-section {
    margin-top: 24px;
    min-height: 500px; /* Standard height for browse section */
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
  
  .clear-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #a0aec0;
    font-size: 24px;
    cursor: pointer;
    padding: 0 8px;
  }
  
  .clear-btn:hover {
    color: white;
  }
  
  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-rows: minmax(150px, auto); /* Ensure minimum height for cards */
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
  
  .asset-owner {
    font-size: 0.875rem;
    color: var(--sidebar-color);
    margin: 0;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding-top: 16px;
  }
  
  .page-btn {
    padding: 6px 12px;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    border-radius: 6px;
    color: var(--button-color);
    cursor: pointer;
  }
  
  .page-btn:hover:not(:disabled) {
    background-color: var(--button-bg-hover);
    color: var(--button-color-hover);
  }
  
  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-info {
    color: var(--sidebar-color);
  }
  
  label {
    color: var(--body-color);
  }
  
  h3 {
    color: var(--container-color);
  }
  
  h4 {
    color: var(--container-color);
  }
  
  .selected-asset-label {
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
  
  .secondary-button {
    background-color: transparent;
    color: var(--body-color);
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid var(--sidebar-bg);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .secondary-button:hover {
    background-color: var(--top-container-bg);
    color: var(--container-color);
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
  
  /* No special modal style needed */
</style>
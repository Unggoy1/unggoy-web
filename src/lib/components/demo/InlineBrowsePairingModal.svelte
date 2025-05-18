<script lang="ts">
  import LargeModal from './LargeModal.svelte';
  import { MOCK_MODES, MOCK_MAPS, MOCK_USER_PAIRED_PLAYLISTS, MOCK_PAIRED_PLAYLISTS } from '$lib/demo/mockData';
  import type { UgcData } from '$lib/api/ugc';
  
  let modal: LargeModal;
  let asset: UgcData | null = null;
  let assetType: 'map' | 'mode' = 'map';
  let selectedPlaylist: string = '';
  let selectedAsset: UgcData | null = null;
  let searchTerm: string = '';
  let currentPage: number = 1;
  let itemsPerPage: number = 6;
  
  // Sorting options
  let sortBy: string = 'name';
  let sortOrder: 'asc' | 'desc' = 'asc';
  
  // Get maps for a specific playlist
  function getMapsForPlaylist(playlistId: string) {
    const playlist = MOCK_PAIRED_PLAYLISTS.find(p => p.playlistId === playlistId);
    if (!playlist) return [];
    
    // Get all maps from pairs and unpaired maps
    const mapsFromPairs = playlist.pairs.map(pair => pair.mapAsset);
    const allMaps = [...mapsFromPairs, ...playlist.unpairedMaps];
    
    // Remove duplicates by assetId
    const uniqueMaps = Array.from(new Map(allMaps.map(map => [map.assetId, map])).values());
    return uniqueMaps;
  }
  
  $: availableAssets = assetType === 'map' 
    ? MOCK_MODES
    : selectedPlaylist 
      ? getMapsForPlaylist(selectedPlaylist)
      : [];
  
  $: filteredAssets = availableAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sorting logic
  $: sortedAssets = [...filteredAssets].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle missing fields in mock data
    if (aVal === undefined) aVal = 0;
    if (bVal === undefined) bVal = 0;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  // Pagination
  $: totalPages = Math.ceil(sortedAssets.length / itemsPerPage);
  $: paginatedAssets = sortedAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset page when filters change
  $: {
    searchTerm;
    sortBy;
    sortOrder;
    currentPage = 1;
  }
  
  export function open(selectedAsset: UgcData) {
    asset = selectedAsset;
    assetType = selectedAsset.assetKind === 'Map' ? 'map' : 'mode';
    selectedPlaylist = '';
    selectedAsset = null;
    searchTerm = '';
    currentPage = 1;
    modal.open();
  }
  
  function cancel() {
    modal.close();
  }
  
  function save(keepOpen = false) {
    if (selectedPlaylist && selectedAsset && asset) {
      console.log('Adding pair:', {
        [assetType]: asset.assetId,
        [assetType === 'map' ? 'mode' : 'map']: selectedAsset.assetId,
        playlist: selectedPlaylist
      });
      
      // Show success message (in a real app, this would be a toast)
      alert(`Pair added successfully: ${asset.name} + ${selectedAsset.name}`);
      
      if (keepOpen) {
        // Clear the selected asset but keep the modal open
        selectedAsset = null;
        searchTerm = '';
      } else {
        modal.close();
      }
    }
  }
  
  function selectAsset(assetItem: UgcData) {
    selectedAsset = assetItem;
  }
  
  function changePage(newPage: number) {
    currentPage = Math.max(1, Math.min(newPage, totalPages));
  }
</script>

<LargeModal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">Add to Paired Playlist</h3>
  
  <div class="modal-content">
    {#if asset}
      <div class="selected-asset">
        <img src={asset.thumbnailUrl} alt={asset.name} class="asset-thumbnail" />
        <div class="asset-info">
          <h4>{asset.name}</h4>
          <p class="selected-asset-label">Selected {assetType === 'map' ? 'Map' : 'Mode'}</p>
        </div>
      </div>
    {/if}
    
    <div class="form-section">
      <label for="playlist-select" class="block text-sm font-medium mb-2">
        Select Playlist
      </label>
      <select
        id="playlist-select"
        bind:value={selectedPlaylist}
        class="playlist-select"
      >
        <option value="">Choose a playlist...</option>
        {#each MOCK_USER_PAIRED_PLAYLISTS as playlist}
          <option value={playlist.playlistId}>
            {playlist.name} ({playlist.pairCount} pairs)
          </option>
        {/each}
      </select>
    </div>
    
    {#if selectedPlaylist}
      <div class="browse-section">
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
          
          <div class="controls-right">
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
        
        <!-- Assets Grid -->
        <div class="assets-grid">
          {#each paginatedAssets as assetItem}
            <button
              class="asset-card"
              class:selected={selectedAsset?.assetId === assetItem.assetId}
              onclick={() => selectAsset(assetItem)}
            >
              <img src={assetItem.thumbnailUrl} alt={assetItem.name} />
              <div class="asset-card-info">
                <p class="asset-owner">{assetItem.name}</p>
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
      </div>
    {/if}
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
  
  .playlist-select {
    width: 100%;
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
  }
  
  .browse-section {
    margin-top: 24px;
  }
  
  .controls-bar {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: center;
  }
  
  .search-input {
    flex: 1;
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
  }
  
  .controls-right {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .sort-select {
    padding: 8px 12px;
    background-color: var(--top-container-bg);
    border: 1px solid var(--sidebar-bg);
    border-radius: 6px;
    color: var(--container-color);
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
    gap: 16px;
    margin-bottom: 16px;
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid var(--sidebar-bg);
    border-radius: 8px;
    padding: 16px;
  }
  
  .asset-card {
    background-color: var(--top-container-bg);
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
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
  }
  
  .asset-card-info {
    padding: 12px;
  }
  
  .asset-owner {
    font-size: 0.875rem;
    color: var(--sidebar-color);
    margin: 0;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
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
  }
  
  .add-another {
    margin-left: auto;
  }
</style>
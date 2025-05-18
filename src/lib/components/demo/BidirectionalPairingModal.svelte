<script lang="ts">
  import Modal from '../Modal.svelte';
  import { MOCK_MODES, MOCK_MAPS, MOCK_USER_PAIRED_PLAYLISTS, MOCK_PAIRED_PLAYLISTS } from '$lib/demo/mockData';
  import type { UgcData } from '$lib/api/ugc';
  
  let modal: Modal;
  let asset: UgcData | null = null;
  let assetType: 'map' | 'mode' = 'map';
  let selectedPlaylist: string = '';
  let selectedAsset: string = '';
  let searchTerm: string = '';
  
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
    ? MOCK_MODES // If we're pairing a map, show modes
    : selectedPlaylist 
      ? getMapsForPlaylist(selectedPlaylist) // If we're pairing a mode, show maps from selected playlist
      : [];
  
  $: filteredAssets = availableAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  $: suggestedAssets = assetType === 'map'
    ? MOCK_MODES.slice(0, 3) // Top 3 modes as suggestions
    : availableAssets.slice(0, 3); // Top 3 maps from playlist as suggestions
  
  export function open(selectedAsset: UgcData) {
    asset = selectedAsset;
    assetType = selectedAsset.assetKind === 'Map' ? 'map' : 'mode';
    selectedPlaylist = '';
    selectedAsset = '';
    searchTerm = '';
    modal.open();
  }
  
  function cancel() {
    modal.close();
  }
  
  function save() {
    if (selectedPlaylist && selectedAsset && asset) {
      console.log('Adding pair:', {
        [assetType]: asset.assetId,
        [assetType === 'map' ? 'mode' : 'map']: selectedAsset,
        playlist: selectedPlaylist
      });
      modal.close();
    }
  }
</script>

<Modal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">Add to Paired Playlist</h3>
  
  <div class="modal-content">
    {#if asset}
      <div class="selected-asset">
        <img src={asset.thumbnailUrl} alt={asset.name} class="asset-thumbnail" />
        <div class="asset-info">
          <h4>{asset.name}</h4>
          <p class="text-sm text-gray-500">Selected {assetType === 'map' ? 'Map' : 'Mode'}</p>
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
        class="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
      >
        <option value="">Choose a playlist...</option>
        {#each MOCK_USER_PAIRED_PLAYLISTS as playlist}
          <option value={playlist.playlistId}>
            {playlist.name} ({playlist.pairCount} pairs)
          </option>
        {/each}
      </select>
    </div>
    
    {#if assetType === 'mode' && selectedPlaylist}
      <div class="form-section">
        <label for="asset-search" class="block text-sm font-medium mb-2">
          Pair with Map
        </label>
        <input
          id="asset-search"
          type="text"
          bind:value={searchTerm}
          placeholder="Search maps in playlist..."
          class="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
        />
        
        {#if filteredAssets.length === 0}
          <div class="no-maps">
            <p>No maps found in this playlist.</p>
          </div>
        {:else if searchTerm}
          <div class="assets-list">
            {#each filteredAssets as mapAsset}
              <button
                class="asset-option"
                class:selected={selectedAsset === mapAsset.assetId}
                onclick={() => selectedAsset = mapAsset.assetId}
              >
                <img src={mapAsset.thumbnailUrl} alt={mapAsset.name} class="asset-option-thumbnail" />
                <div class="asset-option-info">
                  <span class="asset-option-name">{mapAsset.name}</span>
                  <span class="asset-option-stats">{mapAsset.likes} likes • {mapAsset.plays} plays</span>
                </div>
              </button>
            {/each}
          </div>
        {:else}
          <div class="suggested-assets">
            <p class="text-sm text-gray-400 mb-2">Maps in this playlist:</p>
            {#each suggestedAssets as mapAsset}
              <button
                class="asset-option"
                class:selected={selectedAsset === mapAsset.assetId}
                onclick={() => selectedAsset = mapAsset.assetId}
              >
                <img src={mapAsset.thumbnailUrl} alt={mapAsset.name} class="asset-option-thumbnail" />
                <div class="asset-option-info">
                  <span class="asset-option-name">{mapAsset.name}</span>
                  <span class="asset-option-stats">Already in playlist</span>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {:else if assetType === 'map' && selectedPlaylist}
      <div class="form-section">
        <label for="asset-search" class="block text-sm font-medium mb-2">
          Pair with Mode
        </label>
        <input
          id="asset-search"
          type="text"
          bind:value={searchTerm}
          placeholder="Search modes..."
          class="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
        />
        
        {#if searchTerm}
          <div class="assets-list">
            {#each filteredAssets as modeAsset}
              <button
                class="asset-option"
                class:selected={selectedAsset === modeAsset.assetId}
                onclick={() => selectedAsset = modeAsset.assetId}
              >
                <img src={modeAsset.thumbnailUrl} alt={modeAsset.name} class="asset-option-thumbnail" />
                <div class="asset-option-info">
                  <span class="asset-option-name">{modeAsset.name}</span>
                  <span class="asset-option-stats">{modeAsset.likes} likes • {modeAsset.plays} plays</span>
                </div>
              </button>
            {/each}
          </div>
        {:else}
          <div class="suggested-assets">
            <p class="text-sm text-gray-400 mb-2">Suggested modes:</p>
            {#each suggestedAssets as modeAsset}
              <button
                class="asset-option"
                class:selected={selectedAsset === modeAsset.assetId}
                onclick={() => selectedAsset = modeAsset.assetId}
              >
                <img src={modeAsset.thumbnailUrl} alt={modeAsset.name} class="asset-option-thumbnail" />
                <div class="asset-option-info">
                  <span class="asset-option-name">{modeAsset.name}</span>
                  <span class="asset-option-stats">Popular pairing</span>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  {#snippet commands()}
    <button
      type="button"
      onclick={save}
      disabled={!selectedPlaylist || !selectedAsset}
      class="primary-button"
    >
      Add Pair
    </button>
    <button
      type="button"
      onclick={cancel}
      class="secondary-button"
    >
      Cancel
    </button>
  {/snippet}
</Modal>

<style>
  .modal-content {
    max-height: 500px;
    overflow-y: auto;
  }
  
  .selected-asset {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #1a1e1f;
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
  
  .assets-list,
  .suggested-assets {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .asset-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    background-color: #303637;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    text-align: left;
  }
  
  .asset-option:hover {
    background-color: #3a4142;
  }
  
  .asset-option.selected {
    border-color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
  }
  
  .asset-option-thumbnail {
    width: 60px;
    height: 34px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .asset-option-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .asset-option-name {
    font-weight: 500;
    color: white;
  }
  
  .asset-option-stats {
    font-size: 0.875rem;
    color: #a0aec0;
  }
  
  .no-maps {
    text-align: center;
    padding: 20px;
    background-color: #2d3748;
    border-radius: 8px;
    color: #a0aec0;
  }
  
  .primary-button {
    background-color: #667eea;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: #5a67d8;
  }
  
  .primary-button:disabled {
    background-color: #4a5568;
    cursor: not-allowed;
  }
  
  .secondary-button {
    background-color: transparent;
    color: #a0aec0;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #4a5568;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .secondary-button:hover {
    background-color: #2d3748;
    color: white;
  }
</style>
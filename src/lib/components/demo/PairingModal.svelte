<script lang="ts">
  import Modal from '../Modal.svelte';
  import { MOCK_MODES, MOCK_USER_PAIRED_PLAYLISTS } from '$lib/demo/mockData';
  import type { UgcData } from '$lib/api/ugc';
  
  let modal: Modal;
  let mapAsset: UgcData | null = null;
  let selectedPlaylist: string = '';
  let selectedMode: string = '';
  let searchTerm: string = '';
  
  $: filteredModes = MOCK_MODES.filter(mode => 
    mode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  $: suggestedModes = MOCK_MODES.slice(0, 3); // Top 3 modes as suggestions
  
  export function open(map: UgcData) {
    mapAsset = map;
    selectedPlaylist = '';
    selectedMode = '';
    searchTerm = '';
    modal.open();
  }
  
  function cancel() {
    modal.close();
  }
  
  function save() {
    if (selectedPlaylist && selectedMode && mapAsset) {
      console.log('Adding pair:', {
        map: mapAsset.assetId,
        mode: selectedMode,
        playlist: selectedPlaylist
      });
      modal.close();
    }
  }
</script>

<Modal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">Add to Paired Playlist</h3>
  
  <div class="modal-content">
    {#if mapAsset}
      <div class="selected-map">
        <img src={mapAsset.thumbnailUrl} alt={mapAsset.name} class="map-thumbnail" />
        <div class="map-info">
          <h4>{mapAsset.name}</h4>
          <p class="text-sm text-gray-500">Selected Map</p>
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
    
    <div class="form-section">
      <label for="mode-search" class="block text-sm font-medium mb-2">
        Pair with Mode
      </label>
      <input
        id="mode-search"
        type="text"
        bind:value={searchTerm}
        placeholder="Search modes..."
        class="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
      />
      
      {#if searchTerm}
        <div class="modes-list">
          {#each filteredModes as mode}
            <button
              class="mode-option"
              class:selected={selectedMode === mode.assetId}
              onclick={() => selectedMode = mode.assetId}
            >
              <img src={mode.thumbnailUrl} alt={mode.name} class="mode-thumbnail" />
              <div class="mode-info">
                <span class="mode-name">{mode.name}</span>
                <span class="mode-stats">{mode.likes} likes • {mode.plays} plays</span>
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div class="suggested-modes">
          <p class="text-sm text-gray-400 mb-2">Suggested modes:</p>
          {#each suggestedModes as mode}
            <button
              class="mode-option"
              class:selected={selectedMode === mode.assetId}
              onclick={() => selectedMode = mode.assetId}
            >
              <img src={mode.thumbnailUrl} alt={mode.name} class="mode-thumbnail" />
              <div class="mode-info">
                <span class="mode-name">{mode.name}</span>
                <span class="mode-stats">Popular pairing</span>
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  {#snippet commands()}
    <button
      type="button"
      onclick={save}
      disabled={!selectedPlaylist || !selectedMode}
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
  
  .selected-map {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #1a1e1f;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .map-thumbnail {
    width: 80px;
    height: 45px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .map-info h4 {
    font-weight: 600;
    margin: 0;
  }
  
  .form-section {
    margin-bottom: 20px;
  }
  
  .modes-list,
  .suggested-modes {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .mode-option {
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
  
  .mode-option:hover {
    background-color: #3a4142;
  }
  
  .mode-option.selected {
    border-color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
  }
  
  .mode-thumbnail {
    width: 60px;
    height: 34px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .mode-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .mode-name {
    font-weight: 500;
    color: white;
  }
  
  .mode-stats {
    font-size: 0.875rem;
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
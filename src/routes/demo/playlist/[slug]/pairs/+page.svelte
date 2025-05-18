<script>
  import { page } from '$app/stores';
  import { MOCK_PAIRED_PLAYLISTS, MOCK_MODES } from '$lib/demo/mockData';
  
  let selectedMap = null;
  let searchTerm = '';
  
  // Get the playlist based on the slug
  $: playlistId = $page.params.slug;
  $: playlist = MOCK_PAIRED_PLAYLISTS.find(p => p.playlistId === playlistId) || MOCK_PAIRED_PLAYLISTS[0];
  
  $: filteredModes = searchTerm 
    ? MOCK_MODES.filter(mode => mode.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : MOCK_MODES;
  
  function selectMap(map) {
    selectedMap = map;
  }
  
  function pairMapWithMode(modeAsset) {
    if (selectedMap) {
      console.log('Pairing:', selectedMap.name, 'with', modeAsset.name);
      alert(`Demo: Would pair ${selectedMap.name} with ${modeAsset.name}`);
      selectedMap = null; // Reset selection after pairing
    }
  }
  
  function skipMap(map) {
    console.log('Skipping map:', map.name);
    // In a real app, this might move the map to the end of the queue
  }
</script>

<svelte:head>
  <title>{playlist.name} - Pair Maps & Modes</title>
</svelte:head>

<div class="pairing-container">
  <header class="pairing-header">
    <div class="header-top">
      <a href="/demo/playlist/{playlistId}" class="back-button">
        ← Back to playlist
      </a>
      <h1>{playlist.name}</h1>
    </div>
    <p class="subtitle">Select maps and pair them with game modes</p>
  </header>
  
  <div class="pairing-interface">
    <div class="maps-section">
      <h2 class="section-title">Unpaired Maps ({playlist.unpairedMaps.length})</h2>
      
      {#if playlist.unpairedMaps.length === 0}
        <div class="empty-state">
          <p>All maps have been paired!</p>
          <a href="/demo/playlist/{playlistId}" class="view-playlist-link">
            View your playlist →
          </a>
        </div>
      {:else}
        <div class="maps-list">
          {#each playlist.unpairedMaps as map}
            <div 
              class="map-card"
              class:selected={selectedMap?.assetId === map.assetId}
            >
              <img src={map.thumbnailUrl} alt={map.name} class="map-thumbnail" />
              <div class="map-info">
                <h3>{map.name}</h3>
                <p class="map-author">by {map.owner}</p>
                <div class="map-stats">
                  <span>{map.likes} likes</span>
                  <span>•</span>
                  <span>{map.plays} plays</span>
                </div>
              </div>
              <div class="map-actions">
                {#if selectedMap?.assetId === map.assetId}
                  <button class="selected-button" disabled>
                    Selected
                  </button>
                {:else}
                  <button class="select-button" onclick={() => selectMap(map)}>
                    Select
                  </button>
                {/if}
                <button class="skip-button" onclick={() => skipMap(map)}>
                  Skip
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    
    <div class="modes-section">
      <h2 class="section-title">Available Modes</h2>
      
      {#if !selectedMap}
        <div class="no-selection">
          <p>Select a map to begin pairing</p>
        </div>
      {:else}
        <div class="selected-map-display">
          <img src={selectedMap.thumbnailUrl} alt={selectedMap.name} />
          <div>
            <p class="selected-label">Selected Map:</p>
            <p class="selected-name">{selectedMap.name}</p>
          </div>
        </div>
        
        <div class="mode-search">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search modes..."
            class="search-input"
          />
        </div>
        
        <div class="modes-grid">
          {#each filteredModes as mode}
            <button
              class="mode-card"
              onclick={() => pairMapWithMode(mode)}
            >
              <img src={mode.thumbnailUrl} alt={mode.name} class="mode-thumbnail" />
              <div class="mode-info">
                <h4>{mode.name}</h4>
                <p class="mode-stats">{mode.likes} likes • {mode.plays} plays</p>
              </div>
              <div class="pair-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pair-icon">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <div class="demo-notice">
    <p>This is a demo of the dedicated pairing interface.</p>
    <a href="/demo/playlist/{playlistId}" class="demo-link">
      Try the contextual pairing approach →
    </a>
  </div>
</div>

<style>
  .pairing-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .pairing-header {
    margin-bottom: 32px;
  }
  
  .header-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  }
  
  .back-button {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  .back-button:hover {
    text-decoration: underline;
  }
  
  .pairing-header h1 {
    font-size: 2rem;
    font-weight: 700;
  }
  
  .subtitle {
    color: #a0aec0;
    font-size: 1.125rem;
  }
  
  .pairing-interface {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 48px;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .maps-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .map-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: #2d3748;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }
  
  .map-card.selected {
    border-color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
  }
  
  .map-thumbnail {
    width: 120px;
    height: 68px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .map-info {
    flex: 1;
  }
  
  .map-info h3 {
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .map-author {
    color: #a0aec0;
    font-size: 0.875rem;
    margin-bottom: 8px;
  }
  
  .map-stats {
    display: flex;
    gap: 8px;
    color: #718096;
    font-size: 0.875rem;
  }
  
  .map-actions {
    display: flex;
    gap: 8px;
  }
  
  .select-button,
  .skip-button,
  .selected-button {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .select-button {
    background-color: #667eea;
    color: white;
  }
  
  .select-button:hover {
    background-color: #5a67d8;
  }
  
  .selected-button {
    background-color: #48bb78;
    color: white;
    cursor: default;
  }
  
  .skip-button {
    background-color: transparent;
    color: #a0aec0;
    border: 1px solid #4a5568;
  }
  
  .skip-button:hover {
    background-color: #2d3748;
    color: white;
  }
  
  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    background-color: #2d3748;
    border-radius: 8px;
    color: #a0aec0;
  }
  
  .selected-map-display {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: rgba(102, 126, 234, 0.1);
    border: 2px solid #667eea;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .selected-map-display img {
    width: 80px;
    height: 45px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .selected-label {
    font-size: 0.875rem;
    color: #a0aec0;
    margin-bottom: 4px;
  }
  
  .selected-name {
    font-weight: 600;
  }
  
  .mode-search {
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px 16px;
    background-color: #2d3748;
    border: 1px solid #4a5568;
    border-radius: 6px;
    color: white;
    font-size: 1rem;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .modes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .mode-card {
    display: flex;
    flex-direction: column;
    background-color: #2d3748;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
  }
  
  .mode-card:hover {
    transform: translateY(-2px);
    border-color: #667eea;
  }
  
  .mode-thumbnail {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
  
  .mode-info {
    padding: 12px;
    flex: 1;
  }
  
  .mode-info h4 {
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .mode-stats {
    color: #a0aec0;
    font-size: 0.875rem;
  }
  
  .pair-button {
    background-color: #667eea;
    color: white;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pair-icon {
    width: 20px;
    height: 20px;
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background-color: #2d3748;
    border-radius: 8px;
  }
  
  .empty-state p {
    font-size: 1.25rem;
    color: #a0aec0;
    margin-bottom: 16px;
  }
  
  .view-playlist-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  .view-playlist-link:hover {
    text-decoration: underline;
  }
  
  .demo-notice {
    margin-top: 60px;
    padding: 20px;
    background-color: #2d3748;
    border-radius: 8px;
    text-align: center;
  }
  
  .demo-notice p {
    color: #a0aec0;
    margin-bottom: 12px;
  }
  
  .demo-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  .demo-link:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 1024px) {
    .pairing-interface {
      grid-template-columns: 1fr;
    }
  }
</style>
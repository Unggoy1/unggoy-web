<script>
  import { page } from '$app/stores';
  import { MOCK_PAIRED_PLAYLISTS } from '$lib/demo/mockData';
  import PairedAssetCard from '$lib/components/demo/PairedAssetCard.svelte';
  import PairingModal from '$lib/components/demo/PairingModal.svelte';
  
  let pairingModal;
  
  // Get the playlist based on the slug (using first playlist for demo)
  $: playlistId = $page.params.slug;
  $: playlist = MOCK_PAIRED_PLAYLISTS.find(p => p.playlistId === playlistId) || MOCK_PAIRED_PLAYLISTS[0];
  
  function handleRemovePair(pairId) {
    console.log('Removing pair:', pairId);
    // In a real app, this would call an API and update the store
    alert(`Demo: Would remove pair ${pairId}`);
  }
  
  function handleEditPair(pairId) {
    const pair = playlist.pairs.find(p => p.pairId === pairId);
    if (pair) {
      console.log('Editing pair:', pairId);
      // In a real app, this would open a modal to change the mode
      alert(`Demo: Would open modal to change mode for ${pair.mapAsset.name}`);
    }
  }
  
  function handleAddModeToMap(mapAsset) {
    pairingModal.open(mapAsset);
  }
</script>

<svelte:head>
  <title>{playlist.name} - Paired Playlist Demo</title>
</svelte:head>

<PairingModal bind:this={pairingModal} />

<div class="playlist-container">
  <header class="playlist-header">
    <div class="header-content">
      <img src={playlist.thumbnailUrl} alt={playlist.name} class="playlist-thumbnail" />
      <div class="playlist-info">
        <h1>{playlist.name}</h1>
        <p class="description">{playlist.description}</p>
        <div class="playlist-stats">
          <span>By {playlist.author}</span>
          <span>•</span>
          <span>{playlist.favorites} favorites</span>
          <span>•</span>
          <span>{playlist.copies} copies</span>
          <span>•</span>
          <span>{playlist.plays} plays</span>
        </div>
      </div>
    </div>
  </header>
  
  <main class="playlist-content">
    <div class="section">
      <h2 class="section-title">
        Paired Maps & Modes
        <span class="pair-count">({playlist.pairs.length} pairs)</span>
      </h2>
      
      <div class="pairs-grid">
        {#each playlist.pairs as pair}
          <PairedAssetCard
            mapAsset={pair.mapAsset}
            modeAsset={pair.modeAsset}
            pairId={pair.pairId}
            onRemovePair={handleRemovePair}
            onEditPair={handleEditPair}
          />
        {/each}
      </div>
    </div>
    
    {#if playlist.unpairedMaps.length > 0}
      <div class="section">
        <h2 class="section-title">
          Unpaired Maps
          <span class="pair-count">({playlist.unpairedMaps.length} maps)</span>
        </h2>
        <p class="section-description">These maps need modes assigned to them</p>
        
        <div class="pairs-grid">
          {#each playlist.unpairedMaps as map}
            <PairedAssetCard
              mapAsset={map}
              modeAsset={null}
              pairId={`unpaired-${map.assetId}`}
              onRemovePair={() => {}}
              onEditPair={() => handleAddModeToMap(map)}
            />
          {/each}
        </div>
      </div>
    {/if}
    
    <div class="demo-notice">
      <p>This is a demo of the paired playlist viewing experience.</p>
      <a href="/demo/playlist/{playlistId}/pairs" class="demo-link">
        Try the dedicated pairing interface →
      </a>
    </div>
  </main>
</div>

<style>
  .playlist-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .playlist-header {
    margin-bottom: 40px;
  }
  
  .header-content {
    display: flex;
    gap: 24px;
    align-items: start;
  }
  
  .playlist-thumbnail {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .playlist-info {
    flex: 1;
  }
  
  .playlist-info h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
  
  .description {
    font-size: 1.125rem;
    color: #a0aec0;
    margin-bottom: 16px;
  }
  
  .playlist-stats {
    display: flex;
    gap: 12px;
    color: #a0aec0;
    font-size: 0.9rem;
  }
  
  .section {
    margin-bottom: 48px;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .pair-count {
    font-size: 1rem;
    font-weight: 400;
    color: #a0aec0;
  }
  
  .section-description {
    color: #a0aec0;
    margin-bottom: 24px;
  }
  
  .pairs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
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
  
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
    }
    
    .playlist-thumbnail {
      width: 100%;
      height: 200px;
    }
    
    .pairs-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
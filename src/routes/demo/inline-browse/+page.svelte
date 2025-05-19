<script>
  import { onMount } from 'svelte';
  import { ugcBrowse } from '$lib/api/ugc';
  import DemoAssetCardInline from '$lib/components/demo/DemoAssetCardInline.svelte';
  import InlineBrowsePairingModal from '$lib/components/demo/InlineBrowsePairingModal.svelte';
  
  let pairingModal;
  let maps = [];
  let modes = [];
  let loading = true;
  let error = '';
  
  onMount(async () => {
    await loadAssets();
  });
  
  async function loadAssets() {
    loading = true;
    error = '';
    
    try {
      // Load some popular maps
      const mapsResponse = await ugcBrowse({
        assetKind: 2, // Maps
        sort: 'playsAllTime',
        order: 'desc',
        count: 6
      });
      maps = mapsResponse.assets;
      
      // Load some popular modes
      const modesResponse = await ugcBrowse({
        assetKind: 6, // Game modes
        sort: 'playsAllTime',
        order: 'desc',
        count: 6
      });
      modes = modesResponse.assets;
    } catch (err) {
      error = 'Failed to load assets. Please try again.';
      console.error('Error loading assets:', err);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Inline Browse Pairing Demo</title>
</svelte:head>

<InlineBrowsePairingModal bind:this={pairingModal} />

<div class="demo-container">
  <header class="demo-header">
    <h1>Inline Browse Pairing Demo</h1>
    <p>This version includes an inline browse interface within the pairing modal, similar to the AssetsContainer.</p>
  </header>
  
  {#if loading}
    <div class="loading-container">
      <p>Loading assets...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <p>{error}</p>
      <button onclick={loadAssets} class="retry-button">Retry</button>
    </div>
  {:else}
    <div class="content-grid">
      <div class="content-section">
        <h2>Maps</h2>
        <p class="section-description">Click dropdown → "Add to Paired Playlist"</p>
        <div class="assets-grid">
          {#each maps as map}
            <DemoAssetCardInline 
              asset={map} 
              assetUrl="/demo/map/{map.assetId}" 
              {pairingModal}
            />
          {/each}
        </div>
      </div>
      
      <div class="content-section">
        <h2>Modes</h2>
        <p class="section-description">Click dropdown → "Add to Paired Playlist"</p>
        <div class="assets-grid">
          {#each modes as mode}
            <DemoAssetCardInline 
              asset={mode} 
              assetUrl="/demo/mode/{mode.assetId}" 
              {pairingModal}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}
  
  <div class="demo-info">
    <h3>Inline Browse Features:</h3>
    <ul>
      <li>Search functionality within the modal</li>
      <li>Sort by name, likes, or plays</li>
      <li>Ascending/descending order toggle</li>
      <li>Pagination for large collections</li>
      <li>Visual selection state</li>
      <li>Selected item preview before confirming</li>
      <li>No stacked modals - everything in one interface</li>
    </ul>
    
    <div class="demo-links">
      <a href="/demo/bidirectional-pairing" class="demo-link">Try simple bidirectional pairing →</a>
      <a href="/demo" class="demo-link">Back to demo home →</a>
    </div>
  </div>
</div>

<style>
  .demo-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .demo-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .demo-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 16px;
  }
  
  .demo-header p {
    font-size: 1.125rem;
    color: #a0aec0;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }
  
  .content-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .section-description {
    color: #a0aec0;
    margin-bottom: 20px;
  }
  
  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  
  .demo-info {
    background-color: #2d3748;
    border-radius: 12px;
    padding: 32px;
  }
  
  .demo-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .demo-info ul {
    margin-left: 20px;
    margin-bottom: 24px;
    color: #a0aec0;
  }
  
  .demo-info li {
    margin-bottom: 8px;
  }
  
  .demo-links {
    display: flex;
    gap: 20px;
    margin-top: 24px;
  }
  
  .demo-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  .demo-link:hover {
    text-decoration: underline;
  }
  
  .loading-container, .error-container {
    text-align: center;
    padding: 60px 20px;
    color: #a0aec0;
  }
  
  .retry-button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .retry-button:hover {
    background-color: #5a67d8;
  }
  
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
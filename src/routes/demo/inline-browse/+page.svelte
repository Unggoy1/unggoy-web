<script>
  import { MOCK_MAPS, MOCK_MODES } from '$lib/demo/mockData';
  import DemoAssetCardInline from '$lib/components/demo/DemoAssetCardInline.svelte';
  import InlineBrowsePairingModal from '$lib/components/demo/InlineBrowsePairingModal.svelte';
  
  let pairingModal;
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
  
  <div class="content-grid">
    <div class="content-section">
      <h2>Maps</h2>
      <p class="section-description">Click dropdown → "Add to Paired Playlist"</p>
      <div class="assets-grid">
        {#each MOCK_MAPS as map}
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
        {#each MOCK_MODES as mode}
          <DemoAssetCardInline 
            asset={mode} 
            assetUrl="/demo/mode/{mode.assetId}" 
            {pairingModal}
          />
        {/each}
      </div>
    </div>
  </div>
  
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
  
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
<script>
  import { MOCK_MAPS, MOCK_MODES } from '$lib/demo/mockData';
  import DemoAssetCard from '$lib/components/demo/DemoAssetCard.svelte';
</script>

<svelte:head>
  <title>Bidirectional Pairing Demo</title>
</svelte:head>

<div class="demo-container">
  <header class="demo-header">
    <h1>Bidirectional Pairing Demo</h1>
    <p>Try adding pairs from either maps or modes. The pairing process adapts based on what you select.</p>
  </header>
  
  <div class="content-grid">
    <div class="content-section">
      <h2>Maps</h2>
      <p class="section-description">Click dropdown → "Add to Paired Playlist" to pair with a mode</p>
      <div class="assets-grid">
        {#each MOCK_MAPS as map}
          <DemoAssetCard asset={map} assetUrl="/demo/map/{map.assetId}" />
        {/each}
      </div>
    </div>
    
    <div class="content-section">
      <h2>Modes</h2>
      <p class="section-description">Click dropdown → "Add to Paired Playlist" to pair with a map from your playlist</p>
      <div class="assets-grid">
        {#each MOCK_MODES as mode}
          <DemoAssetCard asset={mode} assetUrl="/demo/mode/{mode.assetId}" />
        {/each}
      </div>
    </div>
  </div>
  
  <div class="demo-info">
    <h3>How Bidirectional Pairing Works:</h3>
    <div class="pairing-flows">
      <div class="flow-card">
        <h4>From a Map:</h4>
        <ol>
          <li>Select "Add to Paired Playlist" from map dropdown</li>
          <li>Choose target playlist</li>
          <li>Select a mode to pair with</li>
          <li>Creates new map-mode pair</li>
        </ol>
      </div>
      
      <div class="flow-card">
        <h4>From a Mode:</h4>
        <ol>
          <li>Select "Add to Paired Playlist" from mode dropdown</li>
          <li>Choose target playlist</li>
          <li>Select a map from that playlist to pair with</li>
          <li>Creates new map-mode pair (even if map already has other modes)</li>
        </ol>
      </div>
    </div>
    
    <div class="demo-note">
      <p><strong>Note:</strong> A single map can be paired with multiple modes. Each pairing creates a new entry in the playlist.</p>
    </div>
    
    <div class="demo-links">
      <a href="/demo/playlist/playlist-1" class="demo-link">View paired playlist →</a>
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
    margin-bottom: 24px;
  }
  
  .pairing-flows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .flow-card {
    background-color: #1a202c;
    padding: 20px;
    border-radius: 8px;
  }
  
  .flow-card h4 {
    font-weight: 600;
    margin-bottom: 12px;
    color: #667eea;
  }
  
  .flow-card ol {
    margin-left: 20px;
    color: #a0aec0;
  }
  
  .flow-card li {
    margin-bottom: 8px;
  }
  
  .demo-note {
    background-color: rgba(102, 126, 234, 0.1);
    border: 2px solid #667eea;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
  }
  
  .demo-note p {
    color: #cbd5e0;
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
    .content-grid,
    .pairing-flows {
      grid-template-columns: 1fr;
    }
  }
</style>
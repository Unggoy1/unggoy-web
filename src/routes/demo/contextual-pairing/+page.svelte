<script>
  import { MOCK_MAPS } from '$lib/demo/mockData';
  import DemoAssetCard from '$lib/components/demo/DemoAssetCard.svelte';
  import AssetGroup from '$lib/components/AssetGroup.svelte';
</script>

<svelte:head>
  <title>Contextual Pairing Demo</title>
</svelte:head>

<div class="demo-container">
  <header class="demo-header">
    <h1>Contextual Pairing Demo</h1>
    <p>Click the three dots on any map card and select "Add to Paired Playlist" to see how contextual pairing works.</p>
  </header>
  
  <div class="demo-content">
    <h2>Available Maps</h2>
    <div class="assets-grid">
      {#each MOCK_MAPS as map}
        <DemoAssetCard asset={map} assetUrl="/demo/map/{map.assetId}" />
      {/each}
    </div>
  </div>
  
  <div class="demo-info">
    <h3>How Contextual Pairing Works:</h3>
    <ol>
      <li>User clicks the dropdown menu on a map card</li>
      <li>Selects "Add to Paired Playlist"</li>
      <li>Modal opens showing:
        <ul>
          <li>The selected map</li>
          <li>Playlist selection dropdown</li>
          <li>Mode search/selection interface</li>
        </ul>
      </li>
      <li>User selects playlist and mode, then clicks "Add Pair"</li>
      <li>The map-mode pair is added to the selected playlist</li>
    </ol>
    
    <div class="demo-links">
      <a href="/demo/playlist/playlist-1" class="demo-link">View paired playlist →</a>
      <a href="/demo/playlist/playlist-1/pairs" class="demo-link">Try dedicated pairing interface →</a>
    </div>
  </div>
</div>

<style>
  .demo-container {
    max-width: 1200px;
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
  
  .demo-content {
    margin-bottom: 48px;
  }
  
  .demo-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
  }
  
  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  
  .demo-info ol {
    margin-left: 20px;
    margin-bottom: 24px;
  }
  
  .demo-info li {
    margin-bottom: 12px;
    color: #a0aec0;
  }
  
  .demo-info ul {
    margin-left: 20px;
    margin-top: 8px;
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
</style>
<script>
  import AssetCard from '$lib/components/AssetCard.svelte';
  
  // Mock data for testing
  const mockMap = {
    assetId: "test-map-1",
    assetKind: 2,  
    name: "Blood Gulch",
    owner: "343 Industries",
    thumbnailUrl: "https://via.placeholder.com/300x169?text=Blood+Gulch",
    playsAllTime: 25000,
    averageRating: 4.8,
    favoritedBy: [],
    recommended: false
  };
  
  const mockMode = {
    assetId: "test-mode-1",
    assetKind: 6,
    name: "Capture The Flag", 
    owner: "343 Industries",
    thumbnailUrl: "https://via.placeholder.com/80x80?text=CTF",
    playsAllTime: 15000,
    averageRating: 4.5
  };
  
  const mockGroups = [];
</script>

<div class="container">
  <h1>Paired Asset Card Test</h1>
  
  <div class="cards-grid">
    <!-- Paired card (Map with Mode) -->
    <div>
      <h3>Map with paired Mode</h3>
      <AssetCard 
        asset={mockMap} 
        pairedMode={mockMode}
        groups={mockGroups}
        assetUrl="/maps/{mockMap.assetId}"
      />
    </div>
    
    <!-- Regular map card -->
    <div>
      <h3>Regular Map (no pairing)</h3>
      <AssetCard 
        asset={mockMap} 
        groups={mockGroups}
        assetUrl="/maps/{mockMap.assetId}"
      />
    </div>
    
    <!-- Regular mode card -->
    <div>
      <h3>Regular Mode (no pairing)</h3>
      <AssetCard 
        asset={mockMode} 
        groups={mockGroups}
        assetUrl="/modes/{mockMode.assetId}"
      />
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;  
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 30px;
  }
  
  h3 {
    margin-bottom: 10px;
    color: var(--container-color);
  }
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
</style>
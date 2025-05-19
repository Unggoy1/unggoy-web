<script>
  import AssetCard from '$lib/components/AssetCard.svelte';
  import { getAssetCardGroups } from '$lib/functions';
  import { addAssetModal, playlistModal } from '../../../stores/modal';
  
  // Test data for different asset types
  const testMap = {
    assetId: "test-map-1",
    assetKind: 2,  
    name: "Test Map",
    owner: "Test Author",
    thumbnailUrl: "https://via.placeholder.com/300x169?text=Test+Map",
    playsAllTime: 100,
    averageRating: 4.5,
    favoritedBy: [],
    recommended: false
  };
  
  const testMode = {
    assetId: "test-mode-1",
    assetKind: 6,
    name: "Test Mode", 
    owner: "Test Author",
    thumbnailUrl: "https://via.placeholder.com/300x169?text=Test+Mode",
    playsAllTime: 50,
    averageRating: 4.0,
    favoritedBy: [],
    recommended: false
  };
  
  const testPrefab = {
    assetId: "test-prefab-1",
    assetKind: 4,
    name: "Test Prefab",
    owner: "Test Author", 
    thumbnailUrl: "https://via.placeholder.com/300x169?text=Test+Prefab",
    playsAllTime: 25,
    averageRating: 4.2,
    favoritedBy: [],
    recommended: false
  };
</script>

<div class="container">
  <h1>Integration Test - Asset Cards</h1>
  
  <div class="section">
    <h2>Map Card - Should have "Add to Paired Playlist" option</h2>
    <AssetCard 
      asset={testMap}
      groups={getAssetCardGroups({
        assetId: testMap.assetId,
        assetKind: testMap.assetKind,
        asset: testMap,
        playlistModalVar: $playlistModal,
        addAssetModalVar: $addAssetModal
      })}
      assetUrl="/maps/{testMap.assetId}"
    />
  </div>
  
  <div class="section">
    <h2>Mode Card - Should have "Add to Paired Playlist" option</h2>
    <AssetCard 
      asset={testMode}
      groups={getAssetCardGroups({
        assetId: testMode.assetId,
        assetKind: testMode.assetKind,
        asset: testMode,
        playlistModalVar: $playlistModal,
        addAssetModalVar: $addAssetModal
      })}
      assetUrl="/modes/{testMode.assetId}"
    />
  </div>
  
  <div class="section">
    <h2>Prefab Card - Should NOT have playlist options</h2>
    <AssetCard 
      asset={testPrefab}
      groups={getAssetCardGroups({
        assetId: testPrefab.assetId,
        assetKind: testPrefab.assetKind,
        asset: testPrefab,
        playlistModalVar: $playlistModal,
        addAssetModalVar: $addAssetModal
      })}
      assetUrl="/prefabs/{testPrefab.assetId}"
    />
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
    color: var(--container-color);
  }
  
  h2 {
    margin-bottom: 20px;
    color: var(--container-color);
  }
  
  .section {
    margin-bottom: 60px;
    max-width: 400px;
  }
</style>
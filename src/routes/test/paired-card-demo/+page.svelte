<script>
  import PairedAssetCard from '$lib/components/PairedAssetCard.svelte';
  
  // Mock data for testing
  const mockPairs = [
    {
      id: "pair-1",
      map: {
        assetId: "map1",
        assetKind: 2,
        name: "Blood Gulch",
        owner: "343 Industries",
        thumbnailUrl: "https://via.placeholder.com/300x169",
        playsAllTime: 15000
      },
      gamemode: {
        assetId: "mode1",  
        assetKind: 6,
        name: "Capture the Flag",
        owner: "343 Industries", 
        thumbnailUrl: "https://via.placeholder.com/300x169",
        playsAllTime: 8000
      },
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "pair-2",
      map: {
        assetId: "map2",
        assetKind: 2,
        name: "Lockout",
        owner: "Forger123",
        thumbnailUrl: "https://via.placeholder.com/300x169",
        playsAllTime: 25000
      },
      gamemode: null, // Only map, no gamemode
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "pair-3",
      map: null, // Only gamemode, no map
      gamemode: {
        assetId: "mode3",
        assetKind: 6,
        name: "Team Slayer",
        owner: "ProForger",
        thumbnailUrl: "https://via.placeholder.com/300x169",
        playsAllTime: 50000
      },
      createdAt: "2024-01-15T10:00:00Z"
    }
  ];
</script>

<div class="container">
  <h1>Paired Asset Card Demo</h1>
  
  <div class="cards-grid">
    {#each mockPairs as pair}
      <PairedAssetCard {pair} />
    {/each}
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
  
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
</style>
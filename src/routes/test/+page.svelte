<script>
  import { onMount } from 'svelte';
  import PairDetailModal from './PairDetailModal.svelte';
  
  // Import all view components
  import CompactListView from './views/CompactListView.svelte';
  import GridView1 from './views/GridView1.svelte';
  import GridView2 from './views/GridView2.svelte';
  import GridView3 from './views/GridView3.svelte';
  import ImprovedDesign1 from './views/ImprovedDesign1.svelte';
  import ImprovedDesign2 from './views/ImprovedDesign2.svelte';
  import ImprovedDesign3 from './views/ImprovedDesign3.svelte';
  import ImprovedDesign4 from './views/ImprovedDesign4.svelte';
  import AlignedDesign1 from './views/AlignedDesign1.svelte';
  import AlignedDesign2 from './views/AlignedDesign2.svelte';
  import AlignedDesign3 from './views/AlignedDesign3.svelte';
  import AlignedDesign4 from './views/AlignedDesign4.svelte';
  import NewDesign1 from './views/NewDesign1.svelte';
  import NewDesign2 from './views/NewDesign2.svelte';
  import NewDesign3 from './views/NewDesign3.svelte';
  import NewDesign4 from './views/NewDesign4.svelte';
  import NewDesign5 from './views/NewDesign5.svelte';
  import TranslucentDesign1 from './views/TranslucentDesign1.svelte';
  import TranslucentDesign2 from './views/TranslucentDesign2.svelte';
  import TranslucentDesign3 from './views/TranslucentDesign3.svelte';
  import TranslucentDesign4 from './views/TranslucentDesign4.svelte';
  import TranslucentDesign5 from './views/TranslucentDesign5.svelte';
  import BadgeInteraction1 from './views/BadgeInteraction1.svelte';
  import BadgeInteraction2 from './views/BadgeInteraction2.svelte';
  import BadgeInteraction3 from './views/BadgeInteraction3.svelte';
  import BadgeInteraction4 from './views/BadgeInteraction4.svelte';
  import BadgeInteraction5 from './views/BadgeInteraction5.svelte';
  
  // Sample data
  const DEMO_PAIRS = [
    {
      mapAsset: {
        assetId: "map1",
        name: "Desecration",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/10c60733-28e8-47c3-a2e1-12182aa0400a/bd3b4b6b-fac0-49e1-9a96-52afda7d87be/images/thumbnail.jpg",
      },
      modeAsset: {
        assetId: "mode1",
        name: "Arena:Legacy KotH",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/7bcb7e71-099b-42ea-b9fd-fa89f1148c72/64dfa4a4-3c5d-4bb0-b0e0-6885a9ff002c/images/thumbnail.png",
      },
    },
    {
      mapAsset: {
        assetId: "map2",
        name: "Ivory Tower",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/bb502fbe-9d80-47a0-939d-8c31b861aaf4/d1392985-4570-4b9c-bc74-b1bdc0f8e509/images/thumbnail.jpg",
      },
      modeAsset: {
        assetId: "mode2",
        name: "Arena:Legacy CTF",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/5ee3904d-51a7-47db-9887-1e38e160b8bd/c2a19f77-2d5e-41b3-9b6c-94506d0c4074/images/thumbnail.png",
      },
    },
    {
      mapAsset: {
        assetId: "map3",
        name: "Snowbound",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/75fa80d8-cba9-4c4e-86dd-18e2b9ec12e3/ac5034db-5b9e-446a-91a3-683b3f34d00b/images/thumbnail.jpg",
      },
      modeAsset: {
        assetId: "mode3",
        name: "Arena:Legacy Oddball",
        thumbnailUrl:
          "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/d9249bf2-5c1c-4617-8736-7aa42657507a/6d2e5374-6007-45cc-9a67-b49516b6c681/images/thumbnail.png",
      },
    },
  ];

  let activeView = "grid1";
  let selectedPair = null;
  let modalOpen = false;
  let menuOpen = false;
  let categoryOpen = null;

  function handleSelect(pair) {
    console.log("Selected:", pair);
    selectedPair = pair;
    modalOpen = true;
  }

  function handleNavigateToMap(mapAsset) {
    console.log("Navigate to map:", mapAsset);
  }

  function handleNavigateToMode(modeAsset) {
    console.log("Navigate to mode:", modeAsset);
  }

  const designCategories = {
    singleAction: {
      title: "Single Action Cards",
      color: "bg-blue-500",
      description: "One click target for the entire card",
      designs: [
        { id: "compact", name: "Compact List (Single)" },
        { id: "compact-double", name: "Compact List (Double)" },
        { id: "improved1", name: "Single Click Target" },
        { id: "improved2", name: "Visual Split" },
        { id: "grid1", name: "Basic Grid" }
      ]
    },
    splitInteraction: {
      title: "Split Interaction",
      color: "bg-green-500",
      description: "Different actions for different areas",
      designs: [
        { id: "grid2", name: "Horizontal Expand" },
        { id: "grid3", name: "Vertical Expand" },
        { id: "new4", name: "Split Interactive Zones" },
        { id: "new5", name: "Stacked with Quick Actions" }
      ]
    },
    overlayDesigns: {
      title: "Overlay & Badge",
      color: "bg-purple-500",
      description: "One asset overlaid on another",
      designs: [
        { id: "aligned3", name: "Overlay Style" },
        { id: "aligned4", name: "Badge Style" },
        { id: "translucent1", name: "Clean Overlap" },
        { id: "translucent3", name: "Gradient Fade" }
      ]
    },
    menuDriven: {
      title: "Menu-Driven Actions",
      color: "bg-orange-500",
      description: "Actions via menus or buttons",
      designs: [
        { id: "new1", name: "Enhanced Three-Dot Menu" },
        { id: "aligned1", name: "Clean Split with Menu" },
        { id: "improved3", name: "Primary/Secondary Actions" },
        { id: "new3", name: "Side-by-side with Icons" }
      ]
    },
    hoverStates: {
      title: "Hover-Based Actions",
      color: "bg-pink-500",
      description: "Actions appear on hover",
      designs: [
        { id: "improved4", name: "Card State on Hover" },
        { id: "new2", name: "Hover Actions" }
      ]
    },
    translucentBars: {
      title: "Translucent Info Bars",
      color: "bg-cyan-500",
      description: "Glass-morphism style info display",
      designs: [
        { id: "translucent2", name: "Split with Bar" },
        { id: "translucent4", name: "Minimal Bar" },
        { id: "translucent5", name: "Stacked Info" },
        { id: "aligned2", name: "Diagonal Split" }
      ]
    },
    badgeInteractions: {
      title: "Badge Style Interaction Testing",
      color: "bg-amber-500",
      description: "Testing different interactions with badge overlay style", 
      designs: [
        { id: "badge1", name: "Bottom Bar Three Dots" },
        { id: "badge2", name: "Click for Mini Modal" },
        { id: "badge3", name: "Expand In Place" },
        { id: "badge4", name: "Hover Quick Actions" },
        { id: "badge5", name: "Card Back Flip" }
      ]
    }
  };

  // Find current category and design name
  let currentCategory = null;
  let currentDesignName = "Select a design";
  
  $: {
    currentCategory = null;
    currentDesignName = "Select a design";
    
    Object.entries(designCategories).forEach(([key, category]) => {
      const design = category.designs.find(d => d.id === activeView);
      if (design) {
        currentCategory = category;
        currentDesignName = design.name;
      }
    });
  }
</script>

<style>
  /* Custom component styles */
  :global(body) {
    background-color: #0f172a;
    color: white;
  }
</style>

<div class="min-h-screen -900 p-6">
  <div class="max-w-6xl mx-auto">
    <!-- Compact Header -->
    <div class="mb-8">
      <div class="-800 rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <h1 class="text-2xl font-bold text-white">Halo Playlist Card Designs</h1>
          <div class="text-sm text-slate-400">
            {Object.keys(designCategories).reduce((acc, key) => acc + designCategories[key].designs.length, 0)} designs
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="relative flex-1">
            <button
              on:click={() => menuOpen = !menuOpen}
              class="w-full -700 hover:-600 text-white rounded-lg px-4 py-2 text-left flex items-center justify-between transition-colors"
            >
              <span class="flex items-center gap-2">
                {#if currentCategory}
                  <span class="inline-block w-3 h-3 rounded-full {currentCategory.color}"></span>
                {/if}
                <span>{currentDesignName}</span>
              </span>
              <svg class="w-5 h-5 transition-transform {menuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            {#if menuOpen}
              <div class="absolute z-50 w-full mt-2 -800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
                {#each Object.entries(designCategories) as [key, category]}
                  <div>
                    <button
                      on:click={() => categoryOpen = categoryOpen === key ? null : key}
                      class="w-full px-4 py-3 text-left -800 hover:-700 transition-colors flex items-center justify-between text-white"
                    >
                      <span class="flex-1">
                        <span class="flex items-center gap-2">
                          <span class="inline-block w-3 h-3 rounded-full {category.color}"></span>
                          <span class="font-medium">{category.title}</span>
                        </span>
                        <span class="text-xs text-slate-400 mt-1 block">{category.description}</span>
                      </span>
                      <svg class="w-4 h-4 text-slate-400 transition-transform {categoryOpen === key ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {#if categoryOpen === key}
                      <div class="-900">
                        {#each category.designs as design}
                          <button
                            on:click={() => {
                              activeView = design.id;
                              menuOpen = false;
                              categoryOpen = null;
                            }}
                            class="w-full px-12 py-2 text-left hover:-800 transition-colors text-sm {activeView === design.id ? '-800 text-white' : '-900 text-slate-300'}"
                          >
                            {design.name}
                          </button>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
          
          <!-- Quick Design Pills - Show designs in current category -->
          <div class="hidden md:flex gap-2 flex-wrap max-w-md">
            {#if currentCategory}
              {#each currentCategory.designs as design}
                <button
                  on:click={() => activeView = design.id}
                  class="px-3 py-1 rounded-full text-xs font-medium transition-colors {
                    activeView === design.id
                      ? `${currentCategory.color} text-white` 
                      : '-700 text-slate-300 hover:-600'
                  }"
                >
                  {design.name}
                </button>
              {/each}
            {/if}
          </div>
        </div>
        
        <p class="text-sm text-slate-400 mt-3">
          Compare different card designs for Halo playlist pairs. Click on cards to see interactions.
        </p>
      </div>
    </div>

    <!-- Content -->
    {#if activeView === 'compact'}
      <CompactListView pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'compact-double'}
      <CompactListView pairs={DEMO_PAIRS} onSelect={handleSelect} double={true} />
    {:else if activeView === 'grid1'}
      <GridView1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'grid2'}
      <GridView2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'grid3'}
      <GridView3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'improved1'}
      <ImprovedDesign1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'improved2'}
      <ImprovedDesign2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'improved3'}
      <ImprovedDesign3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'improved4'}
      <ImprovedDesign4 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'aligned1'}
      <AlignedDesign1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'aligned2'}
      <AlignedDesign2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'aligned3'}
      <AlignedDesign3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'aligned4'}
      <AlignedDesign4 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'new1'}
      <NewDesign1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'new2'}
      <NewDesign2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'new3'}
      <NewDesign3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'new4'}
      <NewDesign4 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'new5'}
      <NewDesign5 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'translucent1'}
      <TranslucentDesign1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'translucent2'}
      <TranslucentDesign2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'translucent3'}
      <TranslucentDesign3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'translucent4'}
      <TranslucentDesign4 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'translucent5'}
      <TranslucentDesign5 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'badge1'}
      <BadgeInteraction1 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'badge2'}
      <BadgeInteraction2 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'badge3'}
      <BadgeInteraction3 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'badge4'}
      <BadgeInteraction4 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {:else if activeView === 'badge5'}
      <BadgeInteraction5 pairs={DEMO_PAIRS} onSelect={handleSelect} />
    {/if}
  </div>
</div>

<PairDetailModal
  pair={selectedPair}
  isOpen={modalOpen}
  onClose={() => modalOpen = false}
  onNavigateToMap={handleNavigateToMap}
  onNavigateToMode={handleNavigateToMode}
/>
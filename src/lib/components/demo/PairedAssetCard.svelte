<script lang="ts">
  import type { PlaylistData } from '$lib/api/playlist';
  import type { UgcData } from '$lib/api/ugc';
  import AssetKind from '../AssetKind.svelte';
  import DropdownCard from '../DropdownCard.svelte';
  import { DropdownType } from '$lib/enums';
  import { Plus, Edit, Delete } from '$lib/components/icons';
  
  export let mapAsset: UgcData;
  export let modeAsset: UgcData | null;
  export let pairId: string;
  export let onRemovePair: (pairId: string) => void;
  export let onEditPair: (pairId: string) => void;
  
  let dropdown: DropdownCard;
  
  $: groups = [
    [
      {
        type: DropdownType.Button,
        icon: modeAsset ? Edit : Plus,
        text: modeAsset ? 'Change Mode' : 'Add Mode',
        function: () => onEditPair(pairId)
      },
      {
        type: DropdownType.Button,
        icon: Delete,
        text: 'Remove Pair',
        function: () => onRemovePair(pairId)
      }
    ]
  ];
</script>

<div class="paired-asset-container">
  <div class="asset-section">
    <div class="asset-image-wrapper">
      <a href="/map/{mapAsset.assetId}" class="">
        <img
          class="asset-image"
          src={mapAsset?.thumbnailUrl}
          alt={mapAsset.name}
        />
      </a>
      <AssetKind assetKind={mapAsset.assetKind} recommended={false}></AssetKind>
      <a href="/map/{mapAsset.assetId}" class="asset-name">
        {mapAsset.name}
      </a>
    </div>
  </div>
  
  <div class="divider"></div>
  
  <div class="asset-section">
    {#if modeAsset}
      <div class="asset-image-wrapper">
        <a href="/mode/{modeAsset.assetId}" class="">
          <img
            class="asset-image"
            src={modeAsset?.thumbnailUrl}
            alt={modeAsset.name}
          />
        </a>
        <AssetKind assetKind={modeAsset.assetKind} recommended={false}></AssetKind>
        <a href="/mode/{modeAsset.assetId}" class="asset-name">
          {modeAsset.name}
        </a>
      </div>
    {:else}
      <div class="empty-mode">
        <button class="add-mode-button" onclick={() => onEditPair(pairId)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="add-icon">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span>Add Mode</span>
        </button>
      </div>
    {/if}
  </div>
  
  <button use:dropdown.button class="elipsis" aria-label="More button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
        fill="white"
      />
    </svg>
  </button>
  
  <DropdownCard bind:this={dropdown} {groups}></DropdownCard>
</div>

<style>
  .paired-asset-container {
    position: relative;
    display: flex;
    background-color: #303637;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .paired-asset-container:hover {
    transform: translateY(-2px);
  }
  
  .asset-section {
    flex: 1;
    min-width: 0;
  }
  
  .divider {
    width: 2px;
    background-color: #1a1e1f;
  }
  
  .asset-image-wrapper {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
  }
  
  .asset-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .asset-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 12px 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
    font-weight: 600;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  .empty-mode {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    aspect-ratio: 16/9;
    background-color: #1a1e1f;
  }
  
  .add-mode-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: none;
    border: 2px dashed #4a5568;
    border-radius: 8px;
    color: #a0aec0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .add-mode-button:hover {
    border-color: #667eea;
    color: #667eea;
    background-color: rgba(102, 126, 234, 0.1);
  }
  
  .add-icon {
    width: 32px;
    height: 32px;
  }
  
  .elipsis {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .elipsis:hover {
    background: rgba(0, 0, 0, 0.9);
  }
</style>
<script lang="ts">
  import type { UgcData } from '$lib/api/ugc';
  import AssetKind from '../AssetKind.svelte';
  import DropdownCard from '../DropdownCard.svelte';
  import InlineBrowsePairingModal from './InlineBrowsePairingModal.svelte';
  import { DropdownType } from '$lib/enums';
  import { Plus, Duplicate } from '$lib/components/icons';
  
  export let asset: UgcData = undefined;
  export let assetUrl: string;
  export let pairingModal: InlineBrowsePairingModal;
  
  let dropdown: DropdownCard;
  
  function handleAddToPairedPlaylist() {
    pairingModal.open(asset);
  }
  
  $: groups = [
    [
      {
        type: DropdownType.Button,
        icon: Plus,
        text: 'Add to Playlist',
        function: () => alert('Demo: Would open regular playlist modal')
      },
      {
        type: DropdownType.Button,
        icon: Plus,
        text: 'Add to Paired Playlist',
        function: handleAddToPairedPlaylist
      },
      {
        type: DropdownType.Button,
        icon: Plus,
        text: 'Add to New Playlist',
        function: () => alert('Demo: Would create new playlist')
      }
    ],
    [
      {
        type: DropdownType.Button,
        icon: Duplicate,
        text: 'Copy Asset Link',
        function: () => alert('Demo: Would copy asset link')
      }
    ]
  ];
</script>

<div style="position:relative">
  <div class="asset">
    <div class="asset-image-wrapper">
      <a href={assetUrl} class="">
        <img
          class="asset-image"
          src={asset?.thumbnailUrl ? asset.thumbnailUrl : '/placeholder.webp'}
          alt="thumbnail"
        />
      </a>

      <AssetKind assetKind={asset.assetKind} recommended={asset?.recommended || false}></AssetKind>
      <a href={assetUrl} class="asset-name">
        {asset.name}
      </a>
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
    </div>
  </div>
  <div>
    <DropdownCard bind:this={dropdown} {groups}></DropdownCard>
  </div>
</div>

<style>
  .asset {
    background-color: #303637;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .asset:hover {
    transform: translateY(-2px);
  }
  
  .asset-image-wrapper {
    position: relative;
    aspect-ratio: 16/9;
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
  
  .elipsis {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
  }
  
  .elipsis:hover {
    background: rgba(0, 0, 0, 0.9);
  }
</style>
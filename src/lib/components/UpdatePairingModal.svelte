<script lang="ts">
  import LargeModal from './LargeModal.svelte';
  import { playlistUpdatePair, type PlaylistPair } from '$lib/api/playlist';
  
  let modal: LargeModal;
  let pair: PlaylistPair | null = null;
  let playlistId: string = '';
  let loading = false;
  let error = '';
  
  export function open(pairData: PlaylistPair, playlist: string) {
    pair = pairData;
    playlistId = playlist;
    error = '';
    modal.open();
  }
  
  function cancel() {
    modal.close();
  }
  
  async function save() {
    if (!pair || !playlistId) return;
    
    loading = true;
    error = '';
    
    try {
      // This modal is only used when we have one asset and need to add the other
      const payload = {
        playlistId: playlistId,
        pairId: pair.id
      };
      
      // We'll need to determine what's missing and get that asset ID from somewhere
      // For now, let's just close the modal
      modal.close();
    } catch (err) {
      error = 'Failed to update pair. Please try again.';
      console.error('Error updating pair:', err);
    } finally {
      loading = false;
    }
  }
</script>

<LargeModal bind:this={modal} onclose={cancel}>
  <h3 class="text-lg font-medium leading-6">Complete Pair</h3>
  
  <div class="modal-content">
    {#if pair}
      <div class="existing-asset">
        {#if pair.map}
          <img src={pair.map.thumbnailUrl} alt={pair.map.name} class="asset-thumbnail" />
          <div class="asset-info">
            <h4>{pair.map.name}</h4>
            <p class="asset-type">Map</p>
          </div>
        {:else if pair.gamemode}
          <img src={pair.gamemode.thumbnailUrl} alt={pair.gamemode.name} class="asset-thumbnail" />
          <div class="asset-info">
            <h4>{pair.gamemode.name}</h4>
            <p class="asset-type">Mode</p>
          </div>
        {/if}
      </div>
      
      <div class="instructions">
        {#if pair.map}
          <p>This map needs a game mode to complete the pair.</p>
        {:else}
          <p>This game mode needs a map to complete the pair.</p>
        {/if}
      </div>
      
      {#if error}
        <div class="error-message">{error}</div>
      {/if}
    {/if}
  </div>
  
  {#snippet commands()}
    <div class="command-buttons">
      <button
        type="button"
        onclick={save}
        disabled={loading}
        class="primary-button"
      >
        Save
      </button>
      <button
        type="button"
        onclick={cancel}
        class="primary-button"
      >
        Cancel
      </button>
    </div>
  {/snippet}
</LargeModal>

<style>
  .modal-content {
    width: 100%;
    margin-top: 20px;
  }
  
  .existing-asset {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: var(--top-container-bg);
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .asset-thumbnail {
    width: 80px;
    height: 45px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .asset-info h4 {
    font-weight: 600;
    margin: 0;
  }
  
  .asset-type {
    font-size: 0.875rem;
    color: var(--sidebar-color);
  }
  
  .instructions {
    margin-bottom: 20px;
    color: var(--container-color);
  }
  
  .error-message {
    color: #ef4444;
    margin-bottom: 16px;
  }
  
  .command-buttons {
    display: flex;
    gap: 12px;
    flex-direction: row-reverse;
  }
  
  .primary-button {
    background-color: var(--button-bg);
    color: var(--button-color);
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: var(--button-bg-hover);
    color: var(--button-color-hover);
  }
  
  .primary-button:disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-color);
    cursor: not-allowed;
  }
</style>
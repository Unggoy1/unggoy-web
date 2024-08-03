<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../../../components/assetCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';

	export let data: PageData;
	let addAssetModal: AddAssetModal;
	let playlistModal: PlaylistModal;
</script>

<Toaster />
<AddAssetModal bind:this={addAssetModal}></AddAssetModal>
<PlaylistModal bind:this={playlistModal}></PlaylistModal>
<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data} {addAssetModal} {playlistModal}></AssetsContainer>
</div>

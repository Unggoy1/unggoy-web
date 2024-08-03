<script lang="ts">
	import type { PageData } from './$types';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';

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

<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../components/assetCard.svelte';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { DropdownType } from '$lib/enums';
	import Play from '../components/Play.svelte';
	import Duplicate from '../components/Duplicate.svelte';
	import { getAssetLink } from '$lib/functions';
	import AssetGroup from '$lib/components/AssetGroup.svelte';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	export let data: PageData;
	let addAssetModal: AddAssetModal;
	let playlistModal: PlaylistModal;
</script>

<svelte:head>
	<title>Unggoy - UGC Browser</title>
	<meta name="description" content="Halo Infinite UGC browser. Halo Infinite playlist maker." />
</svelte:head>

<Toaster />
<AddAssetModal bind:this={addAssetModal}></AddAssetModal>
<PlaylistModal bind:this={playlistModal}></PlaylistModal>
<div class="main-container">
	<div class="main-blogs">
		<div class="main-blog">
			<img class="main-blog-bg" src="Tenrai_IV.webp" alt="Tenrai blog key art" />
			<div class="main-blog-text">
				<div class="main-blog-title">Launch of Unggoy to celebrate Tenrai IV</div>
				<div class="main-blog-desc">
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
					unknown printer took a galley of type and scrambled it to make a type specimen book. It
					has survived not only five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged.
				</div>
			</div>
		</div>
	</div>
	<AssetGroup {addAssetModal} {playlistModal} assets={data.newMaps}>
		<a href="/browse?assetKind=Map">
			<div class="small-header">
				New Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup {addAssetModal} {playlistModal} assets={data.trendingMaps}>
		<a href="/browse?assetKind=Map&sort=playsRecent&order=desc">
			<div class="small-header">
				Trending Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup {addAssetModal} {playlistModal} assets={data.newModes}>
		<a href="/browse?assetKind=UgcGameVariant">
			<div class="small-header">
				New Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup {addAssetModal} {playlistModal} assets={data.trendingModes}>
		<a href="/browse?assetKind=UgcGameVariant&sort=playsRecent&order=desc">
			<div class="small-header">
				Trending Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../components/assetCard.svelte';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { DropdownType } from '$lib/enums';
	import Play from '../components/Play.svelte';
	export let data: PageData;
	let dialog: AddAssetModal;
</script>

<Toaster />
<AddAssetModal bind:this={dialog}></AddAssetModal>
<div class="main-container">
	<div class="main-blogs">
		<div class="main-blog">
			<img
				class="main-blog-bg"
				src="https://wpassets.halowaypoint.com/wp-content/2024/06/Tenrai_IV.jpg"
			/>
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
	<div class="assets-container">
		<!-- <a href="/browse?assetKind=Map"> -->
		<div class="small-header">New Maps</div>
		<!-- </a> -->
		<div class="assets">
			{#each data.newMaps as ugc (ugc.assetId)}
				<div style="color: inherit; text-decoration: none;">
					<AssetCard
						{ugc}
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Play,
									text: `Add to Playlist`,
									function: () => dialog.create(ugc.assetId)
								},
								{ type: DropdownType.Button, icon: Play, text: `Add to New Playlist` }
							]
						]}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="assets-container">
		<div class="small-header">Trending Maps</div>
		<div class="assets">
			{#each data.trendingMaps as ugc (ugc.assetId)}
				<div style="color: inherit; text-decoration: none;">
					<AssetCard
						{ugc}
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Play,
									text: `Add to Playlist`,
									function: () => dialog.create(ugc.assetId)
								},
								{ type: DropdownType.Button, icon: Play, text: `Add to New Playlist` }
							]
						]}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="assets-container">
		<div class="small-header">New Modes</div>
		<div class="assets">
			{#each data.newModes as ugc (ugc.assetId)}
				<div style="color: inherit; text-decoration: none;">
					<AssetCard
						{ugc}
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Play,
									text: `Add to Playlist`,
									function: () => dialog.create(ugc.assetId)
								},
								{ type: DropdownType.Button, icon: Play, text: `Add to New Playlist` }
							]
						]}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="assets-container">
		<div class="small-header">Trending Modes</div>
		<div class="assets">
			{#each data.trendingModes as ugc (ugc.assetId)}
				<div style="color: inherit; text-decoration: none;">
					<AssetCard
						{ugc}
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Play,
									text: `Add to Playlist`,
									function: () => dialog.create(ugc.assetId)
								},
								{ type: DropdownType.Button, icon: Play, text: `Add to New Playlist` }
							]
						]}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* TODO: Figure out if there is a better way to go about doing this*/
	@media screen and (max-width: 1963px) {
		.assets div:nth-child(n + 5) {
			display: none;
		}
	}
	@media screen and (max-width: 2299px) {
		.assets div:nth-child(n + 6) {
			display: none;
		}
	}
	@media screen and (max-width: 2635px) {
		.assets div:nth-child(n + 7) {
			display: none;
		}
	}

	@media screen and (max-width: 2971px) {
		.assets div:nth-child(n + 8) {
			display: none;
		}
	}
</style>

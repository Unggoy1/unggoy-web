<script lang="ts">
	import type { UgcData } from '$lib/api/ugc';
	import { getAssetCardGroups } from '$lib/functions';
	import type { Snippet } from 'svelte';
	import AssetCard from './AssetCard.svelte';
	import { addAssetModal, playlistModal } from '../../stores/modal';

	interface Props {
		children: Snippet;
		assets: UgcData[];
	}

	let { children, assets }: Props = $props();
</script>

<div class="assets-container">
	{@render children()}
	<div class="assets">
		{#each assets as asset (asset.assetId)}
			<div style="color: inherit; text-decoration: none;">
				<AssetCard
					{asset}
					groups={getAssetCardGroups({
						assetId: asset.assetId,
						assetKind: asset.assetKind,
						playlistModalVar: $playlistModal,
						addAssetModalVar: $addAssetModal
					})}
					assetUrl="/{asset.assetKind == 2
						? 'maps'
						: asset.assetKind == 6
							? 'modes'
							: 'prefabs'}/{asset.assetId}"
				/>
			</div>
		{/each}
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

<script lang="ts">
	import type { UgcData } from '$lib/api/ugc';
	import { getAssetCardGroups } from '$lib/functions';
	import { onMount, type Snippet } from 'svelte';
	import AssetCard from './AssetCard.svelte';
	import MobileAssetCard from './MobileAssetCard.svelte';
	import { addAssetModal, playlistModal, inlineBrowsePairingModal } from '../../stores/modal';

	interface Props {
		children: Snippet;
		assets: UgcData[];
	}

	let { children, assets }: Props = $props();

	let isMobile = $state(false);

	function checkMobile() {
		isMobile = window.innerWidth <= 769;
	}

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});
</script>

<div class="assets-container">
	{@render children()}
	<div class="assets" class:mobile={isMobile}>
		{#each assets as asset (asset.assetId)}
			{@const groups = getAssetCardGroups({
				assetId: asset.assetId,
				assetKind: asset.assetKind,
				asset: asset,
				playlistModalVar: $playlistModal,
				addAssetModalVar: $addAssetModal,
				inlineBrowsePairingModalVar: $inlineBrowsePairingModal
			})}
			{@const assetUrl = `/${asset.assetKind == 2 ? 'maps' : asset.assetKind == 6 ? 'modes' : asset.assetKind == 4 ? 'prefabs' : 'playlist'}/${asset.assetId}`}

			<div style="color: inherit; text-decoration: none;">
				{#if isMobile}
					{@const drawerOptions = groups.flatMap(group =>
						group.map(item => ({
							icon: item.icon,
							text: item.text,
							onClick: item.function
						}))
					)}
					<MobileAssetCard
						{asset}
						{assetUrl}
						pairedMode={asset.pairedMode ?? null}
						{drawerOptions}
					/>
				{:else}
					<AssetCard
						{asset}
						{groups}
						{assetUrl}
					/>
				{/if}
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

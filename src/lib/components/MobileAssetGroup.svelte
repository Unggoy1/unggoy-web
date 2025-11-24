<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { UgcData } from '$lib/api/ugc';
	import type { PlaylistData } from '$lib/api/playlist';
	import MobileAssetCard from './MobileAssetCard.svelte';
	import { getAssetCardGroups } from '$lib/functions';
	import { addAssetModal, playlistModal, inlineBrowsePairingModal } from '../../stores/modal';
	import { ChevronRight } from '$lib/components/icons';

	interface Props {
		title: string;
		assets: (UgcData | PlaylistData)[];
		browseUrl: string;
	}

	let { title, assets, browseUrl }: Props = $props();
</script>

<div class="mobile-asset-group">
	<div class="mobile-asset-group-header">
		<h2 class="mobile-asset-group-title">{title}</h2>
		<a href={browseUrl} class="browse-button" aria-label="Browse all {title}">
			<ChevronRight active={false} />
		</a>
	</div>

	<div class="mobile-assets-list">
		{#each assets as asset (asset.assetId)}
			{@const assetUrl =
				asset.assetKind === 2
					? `/maps/${asset.assetId}`
					: asset.assetKind === 6
						? `/modes/${asset.assetId}`
						: asset.assetKind === 4
							? `/prefabs/${asset.assetId}`
							: `/playlist/${asset.assetId}`}
			{@const groups = getAssetCardGroups(
				asset,
				() => $addAssetModal.create(asset.assetId),
				() => $playlistModal.create({ assetId: asset.assetId }),
				asset.assetKind === 2 || asset.assetKind === 6
					? () => $inlineBrowsePairingModal.open(asset)
					: undefined
			)}
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
		{/each}
	</div>
</div>

<style>
.mobile-asset-group {
	margin-bottom: 32px;
}

.mobile-asset-group-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	margin-bottom: 16px;
}

.mobile-asset-group-title {
	font-size: 20px;
	font-weight: 600;
	color: var(--container-color);
	margin: 0;
}

.browse-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	background-color: var(--button-bg);
	border-radius: 50%;
	text-decoration: none;
	transition: background-color 0.2s ease-in-out;
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}

.browse-button:hover {
	background-color: var(--button-bg-hover);
}

.mobile-assets-list {
	display: flex;
	flex-direction: column;
}
</style>

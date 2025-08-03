<script lang="ts">
	import type { PlaylistData } from '$lib/api/playlist';
	import type { UgcData } from '$lib/api/ugc';
	import AssetKind from './AssetKind.svelte';
	import DropdownCard from './DropdownCard.svelte';
	import { dev } from '$app/environment';
	
	interface Props {
		asset: UgcData | PlaylistData;
		assetUrl: string;
		pairedMode?: UgcData | null;
		groups: any;
	}
	
	let { asset, assetUrl, pairedMode = null, groups }: Props = $props();
	
	import.meta.env.PROD;
	let dropdown: DropdownCard;
	
	// Ensure assetKind is available using Svelte 5 runes
	const assetKind = $derived(asset?.assetKind ?? null);
</script>

<div style="position:relative">
	<div class="asset">
		<!-- <div class="video-time">{ugc.likes}</div> -->
		<div class="asset-image-wrapper">
			<a href={assetUrl} class="asset-link">
				<div class="asset-image-container">
					<img
						class="asset-image"
						src={asset?.thumbnailUrl ? asset.thumbnailUrl : '/placeholder.webp'}
						alt="thumbnail"
					/>
					<div class="asset-overlay"></div>
				</div>
			</a>

			{#if pairedMode}
				<a href={`/modes/${pairedMode.assetId}`} class="gamemode-chip-link">
					<div class="gamemode-chip">
						<img 
							src={pairedMode.thumbnailUrl} 
							alt={pairedMode.name} 
							class="chip-thumbnail"
						/>
						<span class="chip-name">{pairedMode.name}</span>
					</div>
				</a>
			{:else}
				<AssetKind assetKind={asset.assetKind} recommended={asset?.recommended || false}></AssetKind>
			{/if}
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
.gamemode-chip-link {
	position: absolute;
	top: 10px;
	left: 8px;
	z-index: 10;
	text-decoration: none;
	max-width: calc(100% - 16px);
	transition: transform 0.15s ease-in-out;
	/* Increase tap target size */
	padding: 8px;
	margin: -8px;
	border-radius: 24px;
}

/* Only apply hover effects on non-touch devices */
@media (hover: hover) {
	.gamemode-chip-link:hover {
		transform: translateY(-2px);
	}

	.gamemode-chip-link:hover .gamemode-chip {
		background-color: var(--button-bg);
	}
}

.gamemode-chip {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0 12px 0 0;
	border-radius: 20px;
	background-color: var(--asset-card-bg);
	color: white;
	font-size: 0.875rem; /* Slightly larger font */
	overflow: hidden;
	transition: background-color 0.15s ease-in-out;
	/* Add touch feedback */
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}

.chip-thumbnail {
	width: 40px;
	height: 40px;
	border-radius: 20px 0 0 20px;
	object-fit: cover;
	flex-shrink: 0;
}

.chip-name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex: 1;
}
.asset-link {
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.asset-image-container {
	position: relative;
	width: 100%;
	height: 100%;
}

.asset-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%);
	z-index: 2;
	opacity: 0.8;
	transition: opacity 0.3s ease;
}

@media (hover: hover) {
	.asset:hover .asset-overlay {
		opacity: 0.4;
	}
}
</style>

<script lang="ts">
	import type { PlaylistData } from '$lib/api/playlist';
	import type { UgcData } from '$lib/api/ugc';
	import AssetKind from './AssetKind.svelte';
	import DropdownCard from './DropdownCard.svelte';
	import { dev } from '$app/environment';
	export let asset: UgcData | PlaylistData = undefined;
	export let assetUrl: string;
	export let pairedMode: UgcData | null = null; // Add paired gamemode prop
	import.meta.env.PROD;
	let dropdown: DropdownCard;
	export let groups;
</script>

<div style="position:relative">
	<div class="asset">
		<!-- <div class="video-time">{ugc.likes}</div> -->
		<div class="asset-image-wrapper">
			<a href={assetUrl} class="">
				<img
					class="asset-image"
					src={asset?.thumbnailUrl ? asset.thumbnailUrl : '/placeholder.webp'}
					alt="thumbnail"
				/>
			</a>

			{#if pairedMode}
				<div class="gamemode-chip">
					<img 
						src={pairedMode.thumbnailUrl} 
						alt={pairedMode.name} 
						class="chip-thumbnail"
					/>
					<span class="chip-name">{pairedMode.name}</span>
				</div>
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
.gamemode-chip {
	position: absolute;
	top: 10px;
	left: 8px;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0 10px 0 0;
	border-radius: 18px;
	background-color: var(--asset-card-bg);
	color: white;
	font-size: 0.75rem;
	max-width: calc(100% - 16px);
	overflow: hidden;
}

.chip-thumbnail {
	width: 36px;
	height: 36px;
	border-radius: 18px 0 0 18px;
	object-fit: cover;
	flex-shrink: 0;
}

.chip-name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex: 1;
}
</style>

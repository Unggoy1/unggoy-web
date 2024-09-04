<script lang="ts">
	import type { PlaylistData } from '$lib/api/playlist';
	import type { UgcData } from '$lib/api/ugc';
	import AssetKind from './AssetKind.svelte';
	import DropdownCard from './DropdownCard.svelte';
	export let asset: UgcData | PlaylistData = undefined;
	export let assetUrl: string;

	let dropdown: DropdownCard;
	export let groups;
</script>

<div style="position:relative">
	<div class="asset">
		<!-- <div class="video-time">{ugc.likes}</div> -->
		<div class="asset-image-wrapper">
			<a href={assetUrl} class="">
				<img class="asset-image" src={asset?.thumbnailUrl || '/placeholder.webp'} alt="thumbnail" />
			</a>

			<AssetKind assetKind={asset.assetKind} recommended={asset?.recommended || false}></AssetKind>
			<a href={assetUrl} class="asset-name">
				{asset.name}
			</a>
			<button use:dropdown.button class="elipsis">
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

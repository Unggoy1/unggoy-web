<script lang="ts">
	/** @type {import('./$types').PageLoad} */
	import VideoCard from './videoCard.svelte';
	import { fetchUgc } from '$lib/api';
	import type { UgcData, UgcFetchData } from '$lib/api';

	export let fetchParams: UgcFetchData = {};
	let ugcList: UgcData[];
	export let slice = 20;

	async function loadUgc() {
		try {
			const result = await fetchUgc(fetchParams);
			return result;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="videos">
	{#await loadUgc()}
		<!-- <p>Loading...</p> -->
	{:then ugcList}
		{#each ugcList.slice(0, slice) as ugc}
			<a
				href="/{ugc.AssetKind == 2
					? 'map'
					: ugc.AssetKind == 6
					  ? 'mode'
					  : 'prefab'}?assetId={ugc.AssetId}"
				style="color: inherit; text-decoration: none;"
			>
				<VideoCard {ugc} />
			</a>
		{/each}
	{:catch error}
		<p>Error loading ugcstst: {error.message}</p>
	{/await}
	<!-- <div class="video anim" style="--delay: .7s"> -->
	<!-- 	<div class="video-time">6 min</div> -->
	<!-- 	<div class="video-wrapper"> -->
	<!-- 		<video muted=""> -->
	<!-- 			<source -->
	<!-- 				src="https://player.vimeo.com/external/361861493.sd.mp4?s=19d8275ca755d653042a87ef28b2f0b2eabf57d0&profile_id=139&oauth2_token_id=57447761" -->
	<!-- 				type="video/mp4" -->
	<!-- 			/> -->
	<!-- 		</video> -->
	<!-- 		<div class="author-img__wrapper video-author"> -->
	<!-- 			<svg -->
	<!-- 				viewBox="0 0 24 24" -->
	<!-- 				fill="none" -->
	<!-- 				stroke="currentColor" -->
	<!-- 				stroke-width="3" -->
	<!-- 				stroke-linecap="round" -->
	<!-- 				stroke-linejoin="round" -->
	<!-- 				class="feather feather-check" -->
	<!-- 			> -->
	<!-- 				<path d="M20 6L9 17l-5-5" /> -->
	<!-- 			</svg> -->
	<!-- 			<img -->
	<!-- 				class="author-img" -->
	<!-- 				src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- 	<div class="video-by">Budi Hakim</div> -->
	<!-- 	<div class="video-name">Tips to playing skateboard on the ramp</div> -->
	<!-- 	<div class="video-view"> -->
	<!-- 		50K views<span class="seperate video-seperate"></span>1 week ago -->
	<!-- 	</div> -->
	<!-- </div> -->
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import AssetGroup from '$lib/components/AssetGroup.svelte';
	import { ChevronRight } from '$lib/components/icons';
	import BlogCarousel from '$lib/components/BlogCarousel.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Unggoy - UGC Browser</title>
	<meta name="description" content="Halo Infinite UGC browser. Halo Infinite playlist maker." />
</svelte:head>

<div class="main-container">
	<div class="main-blogs">
		<div class="main-blog">
			<!-- <img class="main-blog-bg" src="Tenrai_IV.webp" alt="Tenrai blog key art" /> -->
			<BlogCarousel images={['Tenrai_IV.webp', 'OneShotSlayer.webp']} imagePath={''}></BlogCarousel>
		</div>
	</div>
	<AssetGroup assets={data.newMaps}>
		<a href="/browse?assetKind=Map">
			<div class="small-header">
				New Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.trendingMaps}>
		<a href="/browse?assetKind=Map&sort=playsRecent&order=desc">
			<div class="small-header">
				Trending Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.newModes}>
		<a href="/browse?assetKind=UgcGameVariant">
			<div class="small-header">
				New Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.trendingModes}>
		<a href="/browse?assetKind=UgcGameVariant&sort=playsRecent&order=desc">
			<div class="small-header">
				Trending Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
</div>

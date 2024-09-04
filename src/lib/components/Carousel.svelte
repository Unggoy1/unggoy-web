<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import AssetKind from './AssetKind.svelte';

	interface Props {
		images: string[];
		imagePath: string;
		assetInfo: any;
	}

	let { images, imagePath, assetInfo }: Props = $props();
	let emblaApi;
	let options = { loop: true };
	let selectedIndex = writable(0);
	function onInit(event) {
		emblaApi = event.detail;
		console.log(emblaApi.slideNodes()); // Access API
		emblaApi.on('select', () => {
			selectedIndex.set(emblaApi.selectedScrollSnap());
		});
	}
	// Update selectedIndex whenever the carousel changes slides
	onMount(() => {
		if (emblaApi) {
		}
	});
</script>

<div class="embla" on:emblaInit={onInit} use:emblaCarouselSvelte={{ options, plugins: undefined }}>
	<div class="embla__container">
		{#each images as src, imageIndex (src)}
			<div class="embla__slide">
				<img class="asset-img-sm" height="267px" src={imagePath + src} alt="nature" />
			</div>
		{/each}
	</div>
</div>
<AssetKind assetKind={assetInfo.kind} lg={false} recommended={assetInfo.recommended}></AssetKind>

<div class="dots">
	{#each images as _, index}
		<span class="dot" class:active={$selectedIndex === index}></span>
	{/each}
</div>

<style>
	.embla {
		position: relative;
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
		position: relative;
	}
	.dots {
		position: absolute;
		bottom: 14px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
	}
	.dot {
		width: 10px;
		height: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		margin: 0 5px;
		transition: background-color 0.3s ease;
	}
	.dot.active {
		background-color: rgba(255, 255, 255, 1);
	}
</style>

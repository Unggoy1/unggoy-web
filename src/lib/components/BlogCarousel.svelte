<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import AssetKind from './AssetKind.svelte';
	import Autoplay from 'embla-carousel-autoplay';

	interface Props {
		images: string[];
		imagePath: string;
		assetInfo?: any;
	}

	let { images, imagePath, assetInfo }: Props = $props();
	let emblaApi;
	let options = { loop: true };
	let plugins: any[] = [Autoplay({ playOnInit: true, delay: 10000 })];
	let selectedIndex = writable(0);
	function onInit(event) {
		emblaApi = event.detail;
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

<div class="embla" on:emblaInit={onInit} use:emblaCarouselSvelte={{ options, plugins }}>
	<div class="embla__container">
		{#each images as src, imageIndex (src)}
			<div class="embla__slide">
				<img class="main-blog-bg" src={imagePath + src} alt="nature" />
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
		{/each}
	</div>
</div>
{#if assetInfo}
	<AssetKind assetKind={assetInfo.kind} lg={false} recommended={assetInfo.recommended}></AssetKind>
{/if}
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
		height: 390px;
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

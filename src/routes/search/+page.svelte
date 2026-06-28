<script lang="ts">
	import type { PageData } from './$types';
	import AssetGroup from '$lib/components/AssetGroup.svelte';
	import CreatorResultCard from '$lib/components/creator/CreatorResultCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { ChevronRight } from '$lib/components/icons';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const q = $derived(data.q);
	const encodedQ = $derived(encodeURIComponent(q));

	const hasResults = $derived(
		data.creators.length > 0 ||
			data.maps.length > 0 ||
			data.modes.length > 0 ||
			data.prefabs.length > 0 ||
			data.playlists.length > 0
	);
</script>

<Seo
	title={q ? `Search results for “${q}”` : 'Search'}
	description={q
		? `Search results for “${q}” across Halo Infinite maps, modes, prefabs, playlists, and creators on Unggoy.`
		: 'Search Halo Infinite community maps, modes, prefabs, playlists, and creators on Unggoy.'}
	noindex={true}
/>

<div class="main-container search-page">
	<header class="search-head">
		<p class="eyebrow">Search</p>
		<h1 class="search-title">
			{#if q}
				Results for <span class="q">“{q}”</span>
			{:else}
				Search Unggoy
			{/if}
		</h1>
	</header>

	{#if !q}
		<div class="search-prompt">
			<p>Find maps, modes, prefabs, playlists, and creators across the site.</p>
			<p class="hint">Start typing in the search bar above.</p>
		</div>
	{:else if !hasResults}
		<div class="assets-container">
			<div class="no-results">
				<div>
					<img src="/superintendent_sad.webp" alt="" />
					<div>No results for “{q}”.</div>
					<div>Try a different search.</div>
				</div>
			</div>
		</div>
	{:else}
		{#if data.creators.length}
			<section class="creator-section">
				<div class="small-header static">
					Creators <span class="count">{data.counts.creators}</span>
				</div>
				<div class="creator-grid">
					{#each data.creators as creator (creator.gamertag)}
						<CreatorResultCard {creator} />
					{/each}
				</div>
			</section>
		{/if}

		{#if data.maps.length}
			<AssetGroup assets={data.maps}>
				<a href={`/browse?assetKind=Map&searchTerm=${encodedQ}`}>
					<div class="small-header">
						Maps <span class="count">{data.counts.maps}</span>
						<ChevronRight></ChevronRight>
					</div>
				</a>
			</AssetGroup>
		{/if}

		{#if data.modes.length}
			<AssetGroup assets={data.modes}>
				<a href={`/browse?assetKind=UgcGameVariant&searchTerm=${encodedQ}`}>
					<div class="small-header">
						Modes <span class="count">{data.counts.modes}</span>
						<ChevronRight></ChevronRight>
					</div>
				</a>
			</AssetGroup>
		{/if}

		{#if data.prefabs.length}
			<AssetGroup assets={data.prefabs}>
				<a href={`/browse?assetKind=Prefab&searchTerm=${encodedQ}`}>
					<div class="small-header">
						Prefabs <span class="count">{data.counts.prefabs}</span>
						<ChevronRight></ChevronRight>
					</div>
				</a>
			</AssetGroup>
		{/if}

		{#if data.playlists.length}
			<AssetGroup assets={data.playlists}>
				<a href={`/browse/playlist?searchTerm=${encodedQ}`}>
					<div class="small-header">
						Playlists <span class="count">{data.counts.playlists}</span>
						<ChevronRight></ChevronRight>
					</div>
				</a>
			</AssetGroup>
		{/if}
	{/if}
</div>

<style>
	.search-head {
		padding: 8px 4px 0;
		margin-bottom: 22px;
	}

	.eyebrow {
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.28em;
		font-size: 11px;
		color: var(--button-color);
		opacity: 0.7;
		margin: 0 0 6px;
	}

	.search-title {
		font-family: var(--display-font);
		font-weight: 600;
		font-size: clamp(24px, 3.4vw, 34px);
		line-height: 1.1;
		margin: 0;
		color: var(--container-color);
		word-break: break-word;
	}

	.search-title .q {
		color: var(--button-color);
	}

	.search-prompt {
		padding: 48px 16px 64px;
		text-align: center;
		color: var(--sidebar-color);
	}

	.search-prompt p {
		margin: 0 0 8px;
		font-size: 18px;
	}

	.search-prompt .hint {
		font-size: 14px;
		opacity: 0.7;
	}

	/* Reuse the homepage row header look; this header is static (no link/chevron). */
	.small-header.static {
		cursor: default;
	}

	/* The Creators block (no .assets-container) just needs the same gap below it
	   that the asset containers get globally, so every section is evenly spaced. */
	.creator-section {
		margin-bottom: 16px;
	}

	.count {
		font-family: var(--hud-font);
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.04em;
		color: var(--sidebar-color);
		margin-left: 10px;
	}

	.creator-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 12px;
		margin-bottom: 0;
	}

	@media (max-width: 769px) {
		.search-head {
			padding: 4px 0 0;
		}
		.creator-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

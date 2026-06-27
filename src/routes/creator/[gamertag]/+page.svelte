<script lang="ts">
	import type { PageData } from './$types';
	import Seo from '$lib/components/Seo.svelte';
	import { absoluteUrl } from '$lib/seo';
	import AssetGroup from '$lib/components/AssetGroup.svelte';
	import CreatorHero from '$lib/components/creator/CreatorHero.svelte';
	import CreatorContent from '$lib/components/creator/CreatorContent.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

	const stats = $derived(data.creator.stats);
	const totalAssets = $derived(
		stats ? (stats.ownedMaps ?? 0) + (stats.ownedModes ?? 0) + (stats.ownedPrefabs ?? 0) : 0
	);

	const seoDescription = $derived(
		data.hasStats && stats
			? `${data.gamertag} has published ${totalAssets} Halo Infinite creation${totalAssets === 1 ? '' : 's'} with ${compact.format(stats.totalPlays ?? 0)} total plays. Browse their maps, modes, prefabs, and playlists on Unggoy.`
			: `Browse ${data.gamertag}'s Halo Infinite maps, modes, prefabs, and playlists on Unggoy.`
	);

	const canonical = $derived(`/creator/${encodeURIComponent(data.gamertag)}`);

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		...(stats?.lastPublishedAt ? { dateModified: stats.lastPublishedAt } : {}),
		mainEntity: {
			'@type': 'Person',
			name: data.gamertag,
			url: absoluteUrl(canonical),
			...(data.creator.serviceTag ? { identifier: data.creator.serviceTag } : {}),
			...(data.creator.emblemPath ? { image: absoluteUrl(data.creator.emblemPath) } : {}),
			...(data.hasStats && stats
				? {
						interactionStatistic: [
							{
								'@type': 'InteractionCounter',
								interactionType: 'https://schema.org/CreateAction',
								userInteractionCount: totalAssets
							},
							{
								'@type': 'InteractionCounter',
								interactionType: 'https://schema.org/PlayAction',
								userInteractionCount: stats.totalPlays ?? 0
							}
						]
					}
				: {})
		}
	});
</script>

<Seo
	title={`${data.gamertag} — Halo Infinite Maps, Modes & Playlists`}
	description={seoDescription}
	{canonical}
	image={data.creator.emblemPath}
	type="profile"
	{jsonLd}
/>

<div class="main-container creator-page">
	<CreatorHero creator={data.creator} hasStats={data.hasStats} backdropUrl={data.backdropUrl} />

	{#if data.featured.length}
		<section class="featured">
			<AssetGroup assets={data.featured}>
				<div class="small-header">Most Played</div>
			</AssetGroup>
		</section>
	{/if}

	<CreatorContent
		content={data.content}
		activeTab={data.activeTab}
		activeRole={data.activeRole}
		stats={data.creator.stats}
	/>
</div>

<style>
	/* Page-scoped design tokens (Spartan service record). Custom properties
	   inherit to the child components. */
	.creator-page {
		--cr-ink: #11171a;
		--cr-plate: #1f2a2e;
		--cr-cyan: #7fe3ea;
		--cr-gold: #dfb759;
		--cr-hairline: rgba(207, 231, 238, 0.14);
	}

	/* The mobile asset grid is a flex column; its card images would otherwise
	   force the whole flex-column layout (and the page) wider than the viewport.
	   Browse avoids this via its filter-bar width floor; the profile has none, so
	   we let the grid and cards shrink to the available width. */
	.creator-page :global(.assets) {
		min-width: 0;
	}
	.creator-page :global(.mobile-asset-card-wrapper) {
		min-width: 0;
	}
	/* On mobile the grids use `1fr` (= minmax(auto,1fr)); `auto` keeps the card's
	   intrinsic image width as the track minimum, forcing the page wide. Use a 0
	   minimum so tracks can shrink to the viewport. */
	@media (max-width: 640px) {
		.creator-page :global(.assets) {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.featured {
		margin-bottom: 8px;
		min-width: 0;
	}
</style>

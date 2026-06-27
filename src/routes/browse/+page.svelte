<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_BASE } from '$lib/seo';

	export let data: PageData;

	const TITLES: Record<string, { title: string; description: string }> = {
		Map: {
			title: 'Browse Halo Infinite Maps',
			description:
				'Discover the latest community-made Halo Infinite Forge maps. Filter by creator, tags, plays, and rating.'
		},
		UgcGameVariant: {
			title: 'Browse Halo Infinite Game Modes',
			description:
				'Discover community-made Halo Infinite game modes and custom variants. Filter by creator, tags, plays, and rating.'
		},
		Prefab: {
			title: 'Browse Halo Infinite Prefabs',
			description:
				'Discover community-made Halo Infinite Forge prefabs to drop into your own creations.'
		}
	};

	const DEFAULT_META = {
		title: 'Browse Halo Infinite Community Content',
		description:
			'Browse community-made Halo Infinite maps, modes, and prefabs. Filter by creator, tags, plays, and rating.'
	};

	$: searchTerm = $page.url.searchParams.get('searchTerm') ?? '';
	$: meta = TITLES[data.filter] ?? DEFAULT_META;
	$: seoTitle = searchTerm ? `Search results for “${searchTerm}”` : meta.title;
	// Consolidate ranking signals onto the clean category URL (drop page/sort/count).
	$: canonical = data.filter
		? `${SITE_BASE}/browse?assetKind=${data.filter}`
		: `${SITE_BASE}/browse`;
</script>

<Seo title={seoTitle} description={meta.description} {canonical} noindex={!!searchTerm} />

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data}></AssetsContainer>
</div>

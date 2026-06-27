<script lang="ts">
	import { page } from '$app/stores';
	import {
		SITE_NAME,
		DEFAULT_OG_IMAGE,
		DEFAULT_DESCRIPTION,
		absoluteUrl,
		serializeJsonLd
	} from '$lib/seo';

	interface Props {
		/** Page title, before the site-name suffix is added. */
		title: string;
		description?: string;
		/** Path or absolute URL. Defaults to the current pathname (no query). */
		canonical?: string;
		/** Path or absolute URL for the social card. Defaults to the site image. */
		image?: string;
		type?: 'website' | 'article' | 'profile';
		/** Keep search results and private pages out of the index. */
		noindex?: boolean;
		/** A JSON-LD object (or array of objects) to embed as structured data. */
		jsonLd?: unknown;
		/** Append " | Unggoy" to the title. */
		appendSiteName?: boolean;
	}

	let {
		title,
		description = DEFAULT_DESCRIPTION,
		canonical,
		image,
		type = 'website',
		noindex = false,
		jsonLd,
		appendSiteName = true
	}: Props = $props();

	const fullTitle = $derived(
		appendSiteName && !title.includes(SITE_NAME) ? `${title} | ${SITE_NAME}` : title
	);
	const canonicalUrl = $derived(absoluteUrl(canonical ?? $page.url.pathname));
	const ogImage = $derived(absoluteUrl(image || DEFAULT_OG_IMAGE));
	const jsonLdBlocks = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{#each jsonLdBlocks as block}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${serializeJsonLd(block)}</scr` + `ipt>`}
	{/each}
</svelte:head>

<script lang="ts">
	import type { PageData } from './$types';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';
	import Seo from '$lib/components/Seo.svelte';

	export let data: PageData;
</script>

<Seo
	title="Browse Halo Infinite Community Playlists"
	description="Discover custom Halo Infinite playlists made by the community — curated collections of maps and game modes ready for your next custom game."
/>

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data}></AssetsContainer>
</div>

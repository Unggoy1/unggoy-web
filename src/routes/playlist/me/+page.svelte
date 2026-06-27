<script lang="ts">
	import type { PageData } from './$types';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';
	import Seo from '$lib/components/Seo.svelte';

	export let data: PageData;
</script>

<Seo title="My Playlists" description="Your Halo Infinite playlists on Unggoy." noindex />

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data} filterTitle={'My Playlists'}></AssetsContainer>
</div>

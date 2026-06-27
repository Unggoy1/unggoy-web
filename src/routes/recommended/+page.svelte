<script lang="ts">
	import type { PageData } from './$types';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';
	import Seo from '$lib/components/Seo.svelte';

	export let data: PageData;
</script>

<Seo
	title="343 Featured Halo Infinite Content"
	description="Halo Infinite maps, modes, and prefabs featured and recommended by 343 Industries / Halo Studios."
/>

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data}></AssetsContainer>
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import AssetsContainer from '$lib/components/AssetsContainer.svelte';

	export let data: PageData;
</script>

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<AssetsContainer browseData={data}></AssetsContainer>
</div>

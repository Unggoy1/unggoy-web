<script lang="ts">
	import MapSvg from './mapSvg.svelte';
	import ModeSvg from './modeSvg.svelte';
	import PrefabSvg from './prefabSvg.svelte';

	export let assetKind: number;
	export let lg: boolean = false;
	export let featured: boolean = false;
</script>

<div class="asset-type" class:lg class:featured>
	{#if assetKind === 2}
		<MapSvg {featured}></MapSvg>
	{:else if assetKind === 4}
		<PrefabSvg {featured}></PrefabSvg>
	{:else if assetKind === 6}
		<ModeSvg {featured}></ModeSvg>
	{:else if assetKind === 5}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
			><path
				d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
			></path></svg
		>
	{/if}
</div>

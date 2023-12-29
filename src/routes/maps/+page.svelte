<script>
	import Videos from '../../components/videos.svelte';
</script>

<div class="main-container">
	<div class="main-header anim" style="--delay: 0s">Discover</div>
	<Videos fetchParams={{ assetKind: 'Map' }}></Videos>
</div>

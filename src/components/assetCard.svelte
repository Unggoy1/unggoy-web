<script lang="ts">
	import type { UgcData } from '$lib/api';
	export let ugc: UgcData;
	let originalAuthor = 'Simply Emu';
</script>

<div class="asset">
	<!-- <div class="video-time">{ugc.likes}</div> -->
	<div class="asset-image-wrapper">
		<img
			class="asset-image"
			src={ugc.thumbnailUrl ||
				'https://wpassets.halowaypoint.com/wp-content/2022/08/CU-August-Header.jpg'}
			alt="thumbnail"
		/>
	</div>
	<div class="asset-name">{ugc.name}</div>
</div>

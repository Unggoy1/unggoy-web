<script lang="ts">
	import type { UgcData } from '$lib/api';
	export let ugc: UgcData;
	let originalAuthor = 'Simply Emu';
</script>

<div class="video anim" style="--delay: .4s">
	<!-- <div class="video-time">{ugc.likes}</div> -->
	<div class="video-wrapper">
		<img
			class="test"
			src={ugc.thumbnailUrl ||
				'https://wpassets.halowaypoint.com/wp-content/2022/08/CU-August-Header.jpg'}
			alt="thumbnail"
		/>
	</div>
	<div class="video-name">{ugc.name}</div>
	<div class="video-view"></div>
</div>

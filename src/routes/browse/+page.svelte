<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { PageData } from './$types';
	import VideoCard from '../../components/videoCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;
	let pagesPerPage = 10;
	let visiblePages: number[] = [];

	const changePage = (page: number) => {
		if (page < 1) {
			data.currentPage = 1;
		} else if (page > data.totalPages) {
			data.currentPage = data.totalPages;
		} else {
			data.currentPage = page;
		}
		updateUrl();
	};

	const updateUrl = () => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('page', String(data.currentPage));
		goto(`?${query.toString()}`);
	};

	function calculateVisiblePages() {
		const start = Math.max(1, data.currentPage - Math.floor(pagesPerPage / 2));
		const end = Math.min(data.totalPages, start + pagesPerPage - 1);
		visiblePages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
	}

	onMount(() => {
		console.log('onmount');
		calculateVisiblePages();
	});

	afterUpdate(() => {
		calculateVisiblePages();
	});

	$: calculateVisiblePages();
</script>

<div class="main-container">
	<div class="main-header anim" style="--delay: 0s">Discover</div>
	<div class="videos">
		{#each data.ugc as ugc (ugc.AssetId)}
			<a
				href="/{ugc.AssetKind == 2
					? 'map'
					: ugc.AssetKind == 6
					  ? 'mode'
					  : 'prefab'}?assetId={ugc.AssetId}"
				style="color: inherit; text-decoration: none;"
			>
				<VideoCard {ugc} />
			</a>
		{/each}
	</div>
	<div class="pagination-container anim" style="--delay: .5s">
		<div class="pagination">
			<ul>
				<li>
					<button on:click={() => changePage(1)}>&lt;&lt;</button>
				</li>
				<li class="prev-nav-group">
					<button on:click={() => changePage(data.currentPage - 1)}>&lt;</button>
				</li>

				{#each visiblePages as page}
					<li class:active={page === data.currentPage}>
						<button on:click={() => changePage(page)}>{page}</button>
					</li>
				{/each}

				<li class="next-nav-group">
					<button on:click={() => changePage(data.currentPage + 1)}>&gt;</button>
				</li>
				<li>
					<button on:click={() => changePage(data.totalPages)}>&gt;&gt;</button>
				</li>
			</ul>
		</div>
	</div>
</div>

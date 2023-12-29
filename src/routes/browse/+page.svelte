<script lang="ts">
	import Videos from '../../components/videos.svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { page } from '$app/stores';

	const assetKind: string = $page.url.searchParams.get('assetKind');

	let currentPage = 1;
	let totalPages = 1000; // Change this to the total number of pages
	let pagesPerPage = 10;
	let visiblePages: number[] = [];

	function changePage(page: number) {
		if (page < 1) {
			currentPage = 1;
		} else if (page > totalPages) {
			currentPage = totalPages;
		} else {
			currentPage = page;
		}
	}

	function calculateVisiblePages() {
		const start = Math.max(1, currentPage - Math.floor(pagesPerPage / 2));
		const end = Math.min(totalPages, start + pagesPerPage - 1);
		visiblePages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
	}

	onMount(() => {
		calculateVisiblePages();
	});

	afterUpdate(() => {
		calculateVisiblePages();
	});

	$: calculateVisiblePages();
</script>

<div class="main-container">
	<div class="main-header anim" style="--delay: 0s">Discover</div>
	<Videos fetchParams={{ assetKind: assetKind || 'Map' }}></Videos>
	<div class="pagination-container anim" style="--delay: .5s">
		<div class="pagination">
			<ul>
				<li>
					<a role="button" on:click={() => changePage(1)}>&lt;&lt;</a>
				</li>
				<li class="prev-nav-group">
					<a role="button" on:click={() => changePage(currentPage - 1)}>&lt;</a>
				</li>

				{#each visiblePages as page}
					<li class:active={page === currentPage}>
						<a role="button" on:click={() => changePage(page)}>{page}</a>
					</li>
				{/each}

				<li class="next-nav-group">
					<a role="button" on:click={() => changePage(currentPage + 1)}>&gt;</a>
				</li>
				<li>
					<a
						role="button"
						on:click={() => changePage(Math.min(totalPages, currentPage + pagesPerPage))}
						>&gt;&gt;</a
					>
				</li>
			</ul>
		</div>
	</div>
</div>

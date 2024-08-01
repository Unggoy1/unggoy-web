<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../../../components/assetCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;
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
		query.set('sort', data.sort);
		query.set('order', data.order);
		goto(`?${query.toString()}`);
	};
</script>

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<div class="assets-container browse">
		<div class="browse-filter-container">
			<div class="filter-container">
				<div class="dropdown-asset">Playlists</div>
			</div>
			<div class="filter-container">
				<div class="filter-group">
					<p class="filter-text">Author:</p>
					<div class="search-bar-filter">
						<input type="text" placeholder="gamertag" />
					</div>
				</div>
				<div class="filter-group">
					<p class="filter-text">Sort:</p>
					<select bind:value={data.sort} on:change={updateUrl} class="dropdown-el">
						<option value="publishedAt" label="Date Published"></option>
						<option value="name" label="Name"></option><option value="averagerating" label="Rating"
						></option>
						<option value="bookmarks" label="Bookmarks"></option>
						<option value="playsRecent" label="Plays Recent"></option>
						<option value="playsAllTime" label="Plays"></option>
					</select>
				</div>
			</div>
		</div>

		<div class="assets browse">
			{#each data.ugc as playlist (playlist.id)}
				<AssetCard {playlist} assetUrl="/playlist/{playlist.id}" groups={[]} />
			{/each}
		</div>
	</div>
	<div class="pagination-container">
		<div class="pagination">
			<ul>
				{#if data.currentPage > 1}
					<li>
						<button on:click={() => changePage(1)}>&lt;&lt;</button>
					</li>
				{/if}
				<li class="prev-nav-group">
					<button on:click={() => changePage(data.currentPage - 1)}>&lt;</button>
				</li>
				<li class="text-only">{data.currentPage} - {data.totalPages}</li>
				<li class="next-nav-group">
					<button on:click={() => changePage(data.currentPage + 1)}>&gt;</button>
				</li>
				{#if data.currentPage < data.totalPages}
					<li>
						<button on:click={() => changePage(data.totalPages)}>&gt;&gt;</button>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>

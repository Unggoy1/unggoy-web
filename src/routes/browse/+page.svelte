<script lang="ts">
	import type { PageData } from './$types';
	import VideoCard from '../../components/videoCard.svelte';
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
		if (data.filter !== '') {
			query.set('assetKind', data.filter);
		} else {
			query.delete('assetKind');
		}
		query.set('sort', data.sort);
		query.set('order', data.order);
		goto(`?${query.toString()}`);
	};
</script>

<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<div class="browse-filter-container anim" style="--delay: .3s">
		<div class="filter-container">
			<p class="filter-text">Filter By:</p>
			<select bind:value={data.filter} on:change={updateUrl} class="dropdown-el">
				<option value="" label="All"></option>
				<option value="Map" label="Maps"></option>
				<option value="UgcGameVariant" label="Modes"></option>
				<option value="Prefab" label="Prefabs"></option>
			</select>
			<p class="filter-text">Sort By:</p>
			<select bind:value={data.sort} on:change={updateUrl} class="dropdown-el">
				<option value="datepublishedutc" label="Date Published"></option>
				<option value="name" label="Name"></option><option value="averagerating" label="Rating"
				></option>
				<option value="bookmarks" label="Bookmarks"></option>
				<option value="playsrecent" label="Plays Recent"></option>
				<option value="playsalltime" label="Plays"></option>
			</select>
			<select bind:value={data.order} on:change={updateUrl} class="dropdown-el">
				<option value="desc" label="Descending"></option>
				<option value="asc" label="Ascending"></option>
			</select>
		</div>
	</div>
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

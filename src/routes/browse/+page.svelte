<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../../components/assetCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Play from '../../components/Play.svelte';
	import { DropdownType } from '$lib/enums';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { user } from '../../stores/user';
	import { getAssetCardGroups } from '$lib/functions';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';

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
		data.tag !== '' ? query.set('tags', data.tag) : query.delete('tags');
		data.gamertag !== '' ? query.set('gamertag', data.gamertag) : query.delete('gamertag');
		query.set('sort', data.sort);
		query.set('order', data.order);
		goto(`?${query.toString()}`);
	};
	let addAssetModal: AddAssetModal;
	let playlistModal: PlaylistModal;
</script>

<Toaster />
<AddAssetModal bind:this={addAssetModal}></AddAssetModal>
<PlaylistModal bind:this={playlistModal}></PlaylistModal>
<div class="main-container">
	<!-- <div class="main-header anim" style="--delay: 0s">Discover</div> -->
	<div class="assets-container browse">
		<div class="browse-filter-container">
			<div class="filter-container">
				<select
					bind:value={data.filter}
					onchange={updateUrl}
					name="AssetFilter"
					class="dropdown-asset"
				>
					<option value="" label="Game Type"></option>
					<option value="Map" label="Maps"></option>
					<option value="UgcGameVariant" label="Modes"></option>
					<option value="Prefab" label="Prefabs"></option>
				</select>
			</div>
			<div class="filter-container">
				<div class="filter-group">
					<p class="filter-text">Contributor:</p>
					<div class="search-bar-filter">
						<input
							bind:value={data.gamertag}
							onkeydown={(event) => event.key === 'Enter' && updateUrl()}
							type="text"
							placeholder="gamertag"
						/>
					</div>
				</div>
				<div class="filter-group">
					<p class="filter-text">Tags:</p>
					<div class="search-bar-filter">
						<input
							bind:value={data.tag}
							onkeydown={(event) => event.key === 'Enter' && updateUrl()}
							type="text"
							placeholder="tag"
						/>
					</div>
				</div>
				<div class="filter-group">
					<p class="filter-text">Sort:</p>
					<select bind:value={data.sort} onchange={updateUrl} name="SortFilter" class="dropdown-el">
						<option value="publishedAt" label="Date Published"></option>
						<option value="name" label="Name"></option><option value="averageRating" label="Rating"
						></option>
						<option value="bookmarks" label="Bookmarks"></option>
						<option value="playsRecent" label="Plays Recent"></option>
						<option value="playsAllTime" label="Plays"></option>
					</select>
				</div>
			</div>
		</div>

		{#if data.ugc.length}
			<div class="assets browse">
				{#each data.ugc as ugc (ugc.assetId)}
					<AssetCard
						{ugc}
						groups={getAssetCardGroups(ugc, addAssetModal, playlistModal)}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				{/each}
			</div>
		{:else}
			<div class="no-results">
				<div>
					<img src="superintendent_sad.webp" alt="Superintendent Sad" />
					<div>Sorry, no results.</div>
					<div>Try searching for something else.</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="pagination-container">
		<div class="pagination">
			<ul>
				{#if data.currentPage > 1}
					<li>
						<button onclick={() => changePage(1)}>&lt;&lt;</button>
					</li>
				{/if}
				<li class="prev-nav-group">
					<button onclick={() => changePage(data.currentPage - 1)}>&lt;</button>
				</li>
				<li class="text-only">{data.currentPage} - {data.totalPages}</li>
				<li class="next-nav-group">
					<button onclick={() => changePage(data.currentPage + 1)}>&gt;</button>
				</li>
				{#if data.currentPage < data.totalPages}
					<li>
						<button onclick={() => changePage(data.totalPages)}>&gt;&gt;</button>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>

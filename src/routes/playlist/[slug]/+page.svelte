<script lang="ts">
	import type { PageData } from './$types';
	import AssetCard from '../../../components/assetCard.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Play from '../../../components/Play.svelte';
	import CreatePlaylistDialog from '../../../components/createPlaylistDialog.svelte';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';
	import { DropdownType } from '$lib/enums';
	import { playlistDeleteAsset } from '$lib/api/playlist';
	import { Toaster } from 'svelte-french-toast';
	import Delete from '../../../components/Delete.svelte';

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
	let dialog: PlaylistModal;
	export function modalOpen(assetId: string) {
		dialog.create(assetId);
	}
</script>

<svelte:head>
	<title>{data.playlist.name}</title>
</svelte:head>

<Toaster />
<div class="main-container">
	<div class="playlist-container">
		<div>
			<div class="playlist-title">{data.playlist.name}</div>
			<div class="playlist-description">
				{data.playlist.description}
			</div>
		</div>
		<div>
			<!-- <CreatePlaylistDialog></CreatePlaylistDialog> -->
			<PlaylistModal bind:this={dialog}></PlaylistModal>
			<button class="favorite">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="34"
					height="32"
					viewBox="0 0 34 32"
					fill="none"
				>
					<path
						d="M16.9243 23.0266L22.6917 26.3733C23.7479 26.9866 25.0404 26.08 24.7624 24.9333L23.2337 18.64L28.334 14.4C29.2651 13.6266 28.7648 12.16 27.5419 12.0666L20.8295 11.52L18.2029 5.57331C17.7304 4.49331 16.1183 4.49331 15.6458 5.57331L13.0192 11.5066L6.30679 12.0533C5.08383 12.1466 4.58353 13.6133 5.51465 14.3866L10.615 18.6266L9.08626 24.92C8.80831 26.0666 10.1008 26.9733 11.157 26.36L16.9243 23.0266Z"
						fill="#212121"
					/>
				</svg>
				<!-- <svg -->
				<!-- 	xmlns="http://www.w3.org/2000/svg" -->
				<!-- 	width="68" -->
				<!-- 	height="64" -->
				<!-- 	viewBox="0 0 68 64" -->
				<!-- 	fill="none" -->
				<!-- > -->
				<!-- 	<path -->
				<!-- 		d="M66.7779 32C66.7779 49.3776 52.0886 63.5 33.9243 63.5C15.7601 63.5 1.0708 49.3776 1.0708 32C1.0708 14.6224 15.7601 0.5 33.9243 0.5C52.0886 0.5 66.7779 14.6224 66.7779 32Z" -->
				<!-- 		fill="#dee3e5" -->
				<!-- 	/> -->
				<!-- </svg> -->
			</button>
		</div>
	</div>
	<div class="assets-container browse">
		<div class="browse-filter-container">
			<div class="filter-container">
				<select bind:value={data.filter} onchange={updateUrl} class="dropdown-asset">
					<option value="" label="Game Type"></option>
					<option value="Map" label="Maps"></option>
					<option value="UgcGameVariant" label="Modes"></option>
					<option value="Prefab" label="Prefabs"></option>
				</select>
			</div>
			<div class="filter-container">
				<div class="filter-group">
					<p class="filter-text">Author:</p>
					<div class="search-bar-filter">
						<input type="text" placeholder="gamertag" />
					</div>
				</div>
				<div class="filter-group">
					<p class="filter-text">Tags:</p>
					<div class="search-bar-filter">
						<input type="text" placeholder="tag" />
					</div>
				</div>
				<div class="filter-group">
					<p class="filter-text">Sort:</p>
					<select bind:value={data.sort} onchange={updateUrl} class="dropdown-el">
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
			{#each data.ugc as ugc (ugc.assetId)}
				<div style="color: inherit; text-decoration: none; max-width: 560px">
					<AssetCard
						{ugc}
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Play,
									text: `Add to Playlist`,
									function: () => modalOpen(ugc.assetId)
								},
								{
									type: DropdownType.Button,
									icon: Delete,
									text: `Remove From Playlist`,
									function: () =>
										playlistDeleteAsset({ playlistId: data.playlist.id, assetId: ugc.assetId })
								},
								{ type: DropdownType.Button, icon: Play, text: `Add to New Playlist` }
							]
						]}
						assetUrl="/{ugc.assetKind == 2
							? 'maps'
							: ugc.assetKind == 6
							  ? 'modes'
							  : 'prefabs'}/{ugc.assetId}"
					/>
				</div>
			{/each}
		</div>
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

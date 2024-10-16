<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BrowseData } from '$lib/api';
	import { getAssetCardGroups } from '$lib/functions';
	import AssetCard from './AssetCard.svelte';
	import { addAssetModal, playlistModal } from '../../stores/modal';
	import { SortOrder } from './icons';

	interface Props {
		browseData: BrowseData;
		filterTitle?: string;
	}

	let { browseData, filterTitle }: Props = $props();

	const changePage = (page: number) => {
		if (page < 1) {
			browseData.currentPage = 1;
		} else if (page > browseData.totalPages) {
			browseData.currentPage = browseData.totalPages;
		} else {
			browseData.currentPage = page;
		}
		updateUrl();
	};
	const updateSortOrder = () => {
		console.log('HEY<YEY');
		browseData.order = browseData.order === 'desc' ? 'asc' : 'desc';
		console.log('OIARESZX?>I<');
		updateUrl();
	};
	const updateUrl = () => {
		console.log('why we no run baby');
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('page', String(browseData.currentPage));
		if (browseData.filter) {
			query.set('assetKind', browseData.filter);
		} else {
			query.delete('assetKind');
		}
		browseData.tag ? query.set('tags', browseData.tag) : query.delete('tags');
		browseData.gamertag ? query.set('gamertag', browseData.gamertag) : query.delete('gamertag');
		browseData.gamertag !== undefined &&
		browseData.gamertag !== '' &&
		browseData.filter !== undefined
			? query.set('ownerOnly', browseData.ownerOnly.toString())
			: query.delete('ownerOnly');
		browseData.filter !== undefined
			? query.set('hide343Assets', browseData.hide343Assets.toString())
			: query.delete('hide343Assets');
		query.set('sort', browseData.sort);
		query.set('order', browseData.order);
		goto(`?${query.toString()}`);
	};
</script>

<div class="assets-container browse">
	<div class="browse-filter-container">
		<div class="filter-container">
			{#if browseData.filter != undefined}
				<select
					bind:value={browseData.filter}
					onchange={updateUrl}
					name="AssetFilter"
					class="dropdown-asset"
				>
					<option value="" label="All Types"></option>
					<option value="Map" label="Maps"></option>
					<option value="UgcGameVariant" label="Modes"></option>
					<option value="Prefab" label="Prefabs"></option>
				</select>
			{:else}
				<div class="dropdown-asset">{filterTitle ?? 'Playlists'}</div>
			{/if}
		</div>
		<div class="filter-container">
			{#if browseData.gamertag != undefined}
				<div class="filter-group" class:input={browseData.filter != undefined}>
					<!-- <p class="filter-text">Contributor:</p> -->
					<div class="search-bar-filter">
						<div class="text-on-input">
							<label>Contributor</label>
							<input
								bind:value={browseData.gamertag}
								onkeydown={(event) => event.key === 'Enter' && updateUrl()}
								type="text"
								placeholder="gamertag"
							/>
						</div>
					</div>
					{#if browseData.gamertag !== ''}
						<!-- Toggle Input with Label -->
						<div class="toggle-group">
							<p class="filter-text">Only owned assets:</p>
							<label class="toggle">
								<input type="checkbox" bind:checked={browseData.ownerOnly} onchange={updateUrl} />
								<span class="slider"></span>
							</label>
						</div>
					{/if}
				</div>
			{/if}

			{#if browseData.tag != undefined}
				<div class="filter-group input">
					<!-- <p class="filter-text">Tags:</p> -->
					<div class="search-bar-filter">
						<div class="text-on-input">
							<label>Tag</label>
							<input
								bind:value={browseData.tag}
								onkeydown={(event) => event.key === 'Enter' && updateUrl()}
								type="text"
								placeholder="tag"
							/>
						</div>
					</div>
				</div>
			{/if}
			<div class="filter-group">
				{#if browseData.hide343Assets !== undefined}
					<!-- Toggle Input with Label -->
					<div class="toggle-group front">
						<p class="filter-text">Hide 343 assets:</p>
						<label class="toggle">
							<input type="checkbox" bind:checked={browseData.hide343Assets} onchange={updateUrl} />
							<span class="slider"></span>
						</label>
					</div>
				{/if}

				<!-- <p class="filter-text">Sort:</p> -->
				<div class="text-on-input">
					<label>Sort</label>
					<select
						bind:value={browseData.sort}
						onchange={updateUrl}
						name="SortFilter"
						class="dropdown-el"
					>
						{#if browseData.filter != undefined}
							<option value="publishedAt" label="Date Published"></option>
							<option value="name" label="Name"></option>
							<option value="averageRating" label="Rating"></option>
							<option value="bookmarks" label="Bookmarks"></option>
							<option value="playsRecent" label="Plays Recent"></option>
							<option value="playsAllTime" label="Plays"></option>
						{:else}
							<option value="updatedAt" label="Date Updated"></option>
							<option value="name" label="Name"></option>
							<option value="favorites" label="Favorites"></option>
						{/if}
					</select>
				</div>
				<button class="order-button" onclick={updateSortOrder}
					><SortOrder desc={browseData.order === 'desc'}></SortOrder></button
				>
			</div>
		</div>
	</div>

	<div class="browse-filter-container small">
		<div class="filter-container">
			{#if browseData.gamertag != undefined}
				<div class="filter-group">
					<p class="filter-text">Contributor:</p>
					<div class="search-bar-filter">
						<input
							bind:value={browseData.gamertag}
							onkeydown={(event) => event.key === 'Enter' && updateUrl()}
							type="text"
							placeholder="gamertag"
						/>
					</div>
				</div>
			{/if}
			{#if browseData.tag != undefined}
				<div class="filter-group">
					<p class="filter-text">Tags:</p>
					<div class="search-bar-filter">
						<input
							bind:value={browseData.tag}
							onkeydown={(event) => event.key === 'Enter' && updateUrl()}
							type="text"
							placeholder="tag"
						/>
					</div>
				</div>
			{/if}
		</div>
	</div>
	{#if browseData.assets.length}
		<div class="assets browse">
			{#each browseData.assets as asset (asset.assetId)}
				<AssetCard
					{asset}
					groups={getAssetCardGroups({
						assetId: asset.assetId,
						assetKind: asset.assetKind,
						playlist: browseData.playlist || undefined,
						playlistModalVar: $playlistModal,
						addAssetModalVar: $addAssetModal
					})}
					assetUrl="/{asset.assetKind == 2
						? 'maps'
						: asset.assetKind == 6
							? 'modes'
							: asset.assetKind == 4
								? 'prefabs'
								: 'playlist'}/{asset.assetId}"
				/>
			{/each}
		</div>
	{:else}
		<div class="no-results">
			<div>
				<img src="/superintendent_sad.webp" alt="Superintendent Sad" />
				<div>Sorry, no results.</div>
				<div>Try searching for something else.</div>
			</div>
		</div>
	{/if}
</div>
<div class="pagination-container">
	<div class="pagination">
		<ul>
			{#if browseData.currentPage > 1}
				<li>
					<button onclick={() => changePage(1)}>&lt;&lt;</button>
				</li>
			{/if}
			<li class="prev-nav-group">
				<button onclick={() => changePage(browseData.currentPage - 1)}>&lt;</button>
			</li>
			<li class="text-only">{browseData.currentPage} - {browseData.totalPages}</li>
			<li class="next-nav-group">
				<button onclick={() => changePage(browseData.currentPage + 1)}>&gt;</button>
			</li>
			{#if browseData.currentPage < browseData.totalPages}
				<li>
					<button onclick={() => changePage(browseData.totalPages)}>&gt;&gt;</button>
				</li>
			{/if}
		</ul>
	</div>
</div>

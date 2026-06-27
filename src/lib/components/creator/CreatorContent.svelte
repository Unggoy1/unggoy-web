<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAssetCardGroups } from '$lib/functions';
	import { PAGE_SIZE_OPTIONS, DEFAULT_PAGE_SIZE, resolvePageSize } from '$lib/api';
	import AssetCard from '$lib/components/AssetCard.svelte';
	import MobileAssetCard from '$lib/components/MobileAssetCard.svelte';
	import { SortOrder } from '$lib/components/icons';
	import { addAssetModal, playlistModal, inlineBrowsePairingModal } from '../../../stores/modal';
	import { user } from '../../../stores/user';
	import CreatorTabs from './CreatorTabs.svelte';
	import type { CreatorStats } from '$lib/api/creator';

	interface Props {
		content: {
			assets: any[];
			totalPages: number;
			currentPage: number;
			selectedPageSize: number;
			totalResults: number;
			sort: string;
			order: string;
		};
		activeTab: string;
		activeRole: string;
		stats?: CreatorStats | null;
	}

	let { content, activeTab, activeRole, stats = null }: Props = $props();

	const isPlaylists = $derived(activeTab === 'playlists');
	const activeUser = $derived($user);
	const selectedPageSize = $derived(resolvePageSize(content.selectedPageSize));

	const sortOptions = $derived(
		isPlaylists
			? [
					{ value: 'updatedAt', label: 'Date Updated' },
					{ value: 'name', label: 'Name' },
					{ value: 'favorites', label: 'Favorites' }
				]
			: [
					{ value: 'publishedAt', label: 'Date Published' },
					{ value: 'name', label: 'Name' },
					{ value: 'averageRating', label: 'Rating' },
					{ value: 'bookmarks', label: 'Bookmarks' },
					{ value: 'playsRecent', label: 'Plays Recent' },
					{ value: 'playsAllTime', label: 'Plays' }
				]
	);

	let isMobile = $state(false);
	function checkMobile() {
		isMobile = window.innerWidth <= 769;
	}
	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	function currentParams() {
		return new URLSearchParams($page.url.searchParams.toString());
	}

	// Sort/order/per-page changes reset pagination to page 1.
	function setParam(key: string, value: string | undefined) {
		const q = currentParams();
		if (value === undefined || value === '') q.delete(key);
		else q.set(key, value);
		q.delete('page');
		goto(`?${q.toString()}`);
	}

	function updateSort(event: Event) {
		setParam('sort', (event.currentTarget as HTMLSelectElement).value);
	}
	function toggleOrder() {
		setParam('order', content.order === 'desc' ? 'asc' : 'desc');
	}
	function updatePageSize(event: Event) {
		const value = resolvePageSize((event.currentTarget as HTMLSelectElement).value);
		setParam('count', value === DEFAULT_PAGE_SIZE ? undefined : String(value));
	}

	function selectRole(role: string) {
		if (role === activeRole) return;
		const q = currentParams();
		q.set('role', role);
		q.delete('page');
		goto(`?${q.toString()}`);
	}

	function changePage(newPage: number) {
		const clamped = Math.max(1, Math.min(newPage, content.totalPages));
		if (clamped === content.currentPage) return;
		const q = currentParams();
		q.set('page', String(clamped));
		goto(`?${q.toString()}`);
	}

	function assetUrl(asset: any) {
		const seg =
			asset.assetKind === 2
				? 'maps'
				: asset.assetKind === 6
					? 'modes'
					: asset.assetKind === 4
						? 'prefabs'
						: 'playlist';
		return `/${seg}/${asset.assetId}`;
	}
</script>

<div class="assets-container creator-results">
	<div class="creator-toolbar">
		<CreatorTabs {activeTab} {activeRole} {stats} />

		<div class="creator-controls">
			{#if !isPlaylists}
				<div class="role-toggle" role="group" aria-label="Creator role">
					<button class:active={activeRole === 'owner'} onclick={() => selectRole('owner')}>
						Owner
					</button>
					<button
						class:active={activeRole === 'contributor'}
						onclick={() => selectRole('contributor')}
					>
						Contributor
					</button>
				</div>
			{/if}

			<div class="filter-group">
				<div class="text-on-input">
					<label for="creator-count">Per page</label>
					<select
						id="creator-count"
						class="dropdown-el compact"
						value={selectedPageSize}
						onchange={updatePageSize}
					>
						{#each PAGE_SIZE_OPTIONS as size (size)}
							<option value={size}>{size}</option>
						{/each}
					</select>
				</div>
				<div class="text-on-input">
					<label for="creator-sort">Sort</label>
					<select id="creator-sort" class="dropdown-el" value={content.sort} onchange={updateSort}>
						{#each sortOptions as opt (opt.value)}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<button class="order-button" onclick={toggleOrder} aria-label="Toggle sort order">
					<SortOrder desc={content.order === 'desc'}></SortOrder>
				</button>
			</div>
		</div>
	</div>

	{#if content.assets.length}
		<div class="assets browse" class:mobile={isMobile}>
			{#each content.assets as asset (asset.assetId)}
				{@const groups = getAssetCardGroups({
					assetId: asset.assetId,
					assetKind: asset.assetKind,
					asset,
					playlistModalVar: $playlistModal,
					addAssetModalVar: $addAssetModal,
					inlineBrowsePairingModalVar: $inlineBrowsePairingModal,
					activeUser
				})}
				{#if isMobile}
					{@const drawerOptions = groups.flatMap((group: any[]) =>
						group.map((item) => ({ icon: item.icon, text: item.text, onClick: item.function }))
					)}
					<MobileAssetCard
						{asset}
						assetUrl={assetUrl(asset)}
						pairedMode={asset.pairedMode ?? null}
						{drawerOptions}
					/>
				{:else}
					<AssetCard {asset} {groups} assetUrl={assetUrl(asset)} />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="no-results">
			<div>
				<img src="/superintendent_sad.webp" alt="Nothing here" />
				<div>Nothing here yet.</div>
				<div>This creator has no {activeTab} to show.</div>
			</div>
		</div>
	{/if}
</div>

{#if content.assets.length}
	<div class="pagination-container">
		<div class="pagination">
			<ul>
				{#if content.currentPage > 1}
					<li><button onclick={() => changePage(1)}>&lt;&lt;</button></li>
				{/if}
				<li class="prev-nav-group">
					<button onclick={() => changePage(content.currentPage - 1)}>&lt;</button>
				</li>
				<li class="text-only">{content.currentPage} - {content.totalPages}</li>
				<li class="next-nav-group">
					<button onclick={() => changePage(content.currentPage + 1)}>&gt;</button>
				</li>
				{#if content.currentPage < content.totalPages}
					<li><button onclick={() => changePage(content.totalPages)}>&gt;&gt;</button></li>
				{/if}
			</ul>
		</div>
	</div>
{/if}

<style>
	/* Results sit in the same panel treatment as the "Most Played" row
	   (.assets-container: dark panel on desktop, transparent on mobile). */
	.creator-results :global(.assets) {
		padding-top: 4px;
	}

	/* One toolbar row on desktop: type pills on the left, all controls
	   (Created/Contributed + sort/order/per-page) grouped on the right. */
	.creator-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px 24px;
		flex-wrap: wrap;
		padding: 18px 0 14px;
	}

	/* Drop the pills' own bottom margin; the toolbar owns the spacing now. */
	.creator-toolbar :global(.creator-tabs) {
		margin-bottom: 0;
	}

	.creator-controls {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	/* Segmented toggle on the site palette (matches the active-chip treatment). */
	.role-toggle {
		display: inline-flex;
		align-items: center;
		height: 48px;
		padding: 4px;
		border-radius: 8px;
		background: var(--top-container-bg);
		border: 2px solid rgba(255, 255, 255, 0.08);
	}

	.role-toggle button {
		height: 100%;
		padding: 0 16px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		background: none;
		color: var(--sidebar-color);
		font-family: var(--body-font);
		font-size: 14px;
		font-weight: 500;
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.role-toggle button:hover {
		color: var(--container-color);
	}

	.role-toggle button.active {
		background: var(--button-color);
		color: var(--button-bg);
		font-weight: 600;
	}

	@media (max-width: 769px) {
		/* Stack on mobile: pills, then the controls (toggle full-width, then the
		   sort/per-page row) — unchanged from before. */
		.creator-toolbar {
			flex-direction: column;
			align-items: stretch;
			gap: 14px;
			padding: 0 0 14px;
		}

		.creator-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.role-toggle {
			width: 100%;
		}
		.role-toggle button {
			flex: 1;
		}

		/* Keep the sort/per-page widgets in one row instead of stretching each to
		   full width (the global mobile rule), so the bar stays compact. */
		.creator-controls :global(.filter-group) {
			width: 100%;
			justify-content: flex-start;
			padding-right: 0;
		}
		.creator-controls :global(.dropdown-el) {
			width: auto;
			min-width: 0;
			flex: 1;
		}
		.creator-controls :global(.dropdown-el.compact) {
			flex: 0 0 auto;
		}
	}
</style>

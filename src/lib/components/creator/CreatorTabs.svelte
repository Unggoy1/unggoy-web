<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CreatorStats } from '$lib/api/creator';

	interface Props {
		activeTab: string;
		activeRole: string;
		stats?: CreatorStats | null;
	}

	let { activeTab, activeRole, stats = null }: Props = $props();

	// Owner mode shows owned counts; Contributor mode shows contributed counts.
	// Contributed counts are optional — until the backend returns them the badge
	// stays hidden (an undefined count renders nothing). Playlists are always the
	// creator's own, so that count never changes with the role.
	const isContributor = $derived(activeRole === 'contributor');

	const tabs = $derived([
		{
			id: 'maps',
			label: 'Maps',
			count: isContributor ? stats?.contributedMaps : stats?.ownedMaps
		},
		{
			id: 'modes',
			label: 'Modes',
			count: isContributor ? stats?.contributedModes : stats?.ownedModes
		},
		{
			id: 'prefabs',
			label: 'Prefabs',
			count: isContributor ? stats?.contributedPrefabs : stats?.ownedPrefabs
		},
		{ id: 'playlists', label: 'Playlists', count: stats?.playlists }
	]);

	// Switching tab resets sort/page (sort options differ per tab).
	function selectTab(id: string) {
		if (id !== activeTab) goto(`?tab=${id}`);
	}
</script>

<div class="creator-tabs" role="tablist">
	{#each tabs as tab}
		<button
			class="creator-chip"
			class:active={activeTab === tab.id}
			role="tab"
			aria-selected={activeTab === tab.id}
			onclick={() => selectTab(tab.id)}
		>
			{tab.label}
			{#if typeof tab.count === 'number'}
				<span class="chip-count">{tab.count}</span>
			{/if}
		</button>
	{/each}
</div>

<style>
	/* Pill chips matching the homepage ScrollableChips, on the site's palette. */
	.creator-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 20px;
	}

	.creator-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		background-color: var(--button-bg);
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 14px;
		font-weight: 500;
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.creator-chip:hover {
		background-color: var(--button-bg-hover);
	}

	.creator-chip.active {
		background-color: var(--button-color);
		color: var(--button-bg);
		font-weight: 600;
	}

	.chip-count {
		font-size: 12px;
		opacity: 0.65;
		font-variant-numeric: tabular-nums;
	}

	.creator-chip.active .chip-count {
		opacity: 0.8;
	}
</style>

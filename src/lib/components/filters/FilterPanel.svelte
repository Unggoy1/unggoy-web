<script lang="ts">
	import { untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TagInput from './TagInput.svelte';
	import { PAGE_SIZE_OPTIONS, DEFAULT_PAGE_SIZE, resolvePageSize, type BrowseData } from '$lib/api';
	import type { FilterValues } from './types';

	interface Props {
		browseData: BrowseData;
		onApply: (values: FilterValues) => void;
		onClear: () => void;
		/** Show the per-page selector here (used on mobile, where it leaves the bar). */
		showPageSize?: boolean;
	}

	let { browseData, onApply, onClear, showPageSize = false }: Props = $props();

	// Per-page applies live (like the bar), independent of the Apply flow.
	const pageSizeApplies = $derived(showPageSize && browseData.selectedPageSize !== undefined);
	const currentPageSize = $derived(resolvePageSize(browseData.selectedPageSize));

	function changePageSize(event: Event) {
		const value = resolvePageSize((event.currentTarget as HTMLSelectElement).value);
		const query = new URLSearchParams($page.url.searchParams.toString());
		if (value === DEFAULT_PAGE_SIZE) query.delete('count');
		else query.set('count', value.toString());
		query.delete('page');
		goto(`?${query.toString()}`);
	}

	// Draft state, seeded once from the live filters (the panel re-mounts each open,
	// so this captures current values). Editing here doesn't take effect until Apply.
	let tags = $state<string[]>(untrack(() => [...(browseData.tags ?? [])]));
	let gamertag = $state(untrack(() => browseData.gamertag ?? ''));
	let ownerOnly = $state(untrack(() => browseData.ownerOnly ?? false));
	let hide343Assets = $state(untrack(() => browseData.hide343Assets ?? false));

	// Only show sections that apply to this page (mirrors the old conditionals).
	const showTags = $derived(browseData.tags !== undefined);
	const showContributor = $derived(browseData.gamertag !== undefined);
	// Owned-only doesn't apply to playlists (their loader never sets ownerOnly).
	const showOwned = $derived(browseData.ownerOnly !== undefined);
	const showHide343 = $derived(browseData.hide343Assets !== undefined);

	function apply() {
		onApply({ tags, gamertag: gamertag.trim(), ownerOnly, hide343Assets });
	}

	function clearAll() {
		tags = [];
		gamertag = '';
		ownerOnly = false;
		hide343Assets = false;
		onClear();
	}
</script>

<div class="filter-panel">
	{#if showTags}
		<section class="fp-section">
			<div class="fp-label">Tags</div>
			<TagInput bind:tags />
		</section>
	{/if}

	{#if showContributor}
		<section class="fp-section">
			<div class="fp-label">Contributor</div>
			<input
				class="fp-input"
				bind:value={gamertag}
				type="text"
				placeholder="gamertag"
				autocomplete="off"
			/>
			{#if gamertag.trim() && showOwned}
				<button
					type="button"
					class="filter-toggle fp-owned"
					class:active={ownerOnly}
					aria-pressed={ownerOnly}
					onclick={() => (ownerOnly = !ownerOnly)}
				>
					Owned only
				</button>
			{/if}
		</section>
	{/if}

	{#if showHide343}
		<section class="fp-section">
			<button
				type="button"
				class="filter-toggle"
				class:active={hide343Assets}
				aria-pressed={hide343Assets}
				onclick={() => (hide343Assets = !hide343Assets)}
			>
				Hide 343 content
			</button>
		</section>
	{/if}

	{#if pageSizeApplies}
		<section class="fp-section">
			<div class="fp-label">Results per page</div>
			<select class="fp-input fp-select" value={currentPageSize} onchange={changePageSize}>
				{#each PAGE_SIZE_OPTIONS as size (size)}
					<option value={size}>{size}</option>
				{/each}
			</select>
		</section>
	{/if}

	<div class="fp-actions">
		<button type="button" class="fp-clear" onclick={clearAll}>Clear all</button>
		<button type="button" class="fp-apply" onclick={apply}>Apply</button>
	</div>
</div>

<style>
	.filter-panel {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.fp-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.fp-label {
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-size: 11px;
		color: var(--sidebar-color);
	}

	.fp-input {
		width: 100%;
		height: 44px;
		padding: 0 14px;
		background: var(--container-bg);
		border: 2px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 14px;
		outline: none;
	}

	.fp-input:focus {
		border-color: rgba(255, 255, 255, 0.4);
	}

	.fp-select {
		cursor: pointer;
		appearance: auto;
	}

	.fp-input::placeholder {
		color: #dee3e5bf;
	}

	.fp-owned {
		align-self: flex-start;
	}

	.fp-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding-top: 4px;
	}

	.fp-clear {
		background: none;
		border: none;
		color: var(--sidebar-color);
		font-family: var(--body-font);
		font-size: 14px;
		cursor: pointer;
		padding: 8px 4px;
	}

	.fp-clear:hover {
		color: var(--container-color);
		text-decoration: underline;
	}

	.fp-apply {
		height: 42px;
		padding: 0 22px;
		border: none;
		border-radius: 8px;
		background: var(--button-color);
		color: var(--button-bg);
		font-family: var(--body-font);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.fp-apply:hover {
		background: var(--button-color-hover);
	}
</style>

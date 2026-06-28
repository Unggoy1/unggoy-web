<script lang="ts">
	import type { BrowseData } from '$lib/api';
	import type { FilterValues } from './types';

	interface Props {
		browseData: BrowseData;
		onApply: (values: FilterValues) => void;
		onClear: () => void;
	}

	let { browseData, onApply, onClear }: Props = $props();

	const current = $derived<FilterValues>({
		tags: browseData.tags ?? [],
		gamertag: browseData.gamertag ?? '',
		ownerOnly: browseData.ownerOnly ?? false,
		hide343Assets: browseData.hide343Assets ?? false
	});

	const count = $derived(
		current.tags.length +
			(current.gamertag ? 1 : 0) +
			(current.ownerOnly ? 1 : 0) +
			(current.hide343Assets ? 1 : 0)
	);

	function removeTag(tag: string) {
		onApply({ ...current, tags: current.tags.filter((t) => t !== tag) });
	}
	function removeContributor() {
		onApply({ ...current, gamertag: '', ownerOnly: false });
	}
	function removeOwned() {
		onApply({ ...current, ownerOnly: false });
	}
	function removeHide343() {
		onApply({ ...current, hide343Assets: false });
	}
</script>

{#if count > 0}
	<div class="applied-filters">
		{#each current.tags as tag (tag)}
			<button
				type="button"
				class="applied-chip"
				aria-label={`Remove tag ${tag}`}
				onclick={() => removeTag(tag)}
			>
				{tag}<span class="x" aria-hidden="true">✕</span>
			</button>
		{/each}

		{#if current.gamertag}
			<button
				type="button"
				class="applied-chip"
				aria-label={`Remove contributor ${current.gamertag}`}
				onclick={removeContributor}
			>
				by {current.gamertag}<span class="x" aria-hidden="true">✕</span>
			</button>
		{/if}

		{#if current.ownerOnly}
			<button
				type="button"
				class="applied-chip"
				aria-label="Remove owned-only filter"
				onclick={removeOwned}
			>
				Owned only<span class="x" aria-hidden="true">✕</span>
			</button>
		{/if}

		{#if current.hide343Assets}
			<button
				type="button"
				class="applied-chip"
				aria-label="Remove hide-343 filter"
				onclick={removeHide343}
			>
				Hide 343<span class="x" aria-hidden="true">✕</span>
			</button>
		{/if}

		<button type="button" class="clear-all" onclick={onClear}>Clear all</button>
	</div>
{/if}

<style>
	.applied-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding: 0 14px 14px;
	}

	.applied-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 32px;
		padding: 0 10px 0 12px;
		border: 1px solid rgba(207, 231, 238, 0.18);
		border-radius: 16px;
		background: var(--container-bg);
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.applied-chip:hover {
		border-color: rgba(207, 231, 238, 0.4);
		background: var(--button-bg);
	}

	.applied-chip .x {
		font-size: 10px;
		opacity: 0.65;
	}

	.applied-chip:hover .x {
		opacity: 1;
	}

	.clear-all {
		border: none;
		background: none;
		color: var(--sidebar-color);
		font-family: var(--body-font);
		font-size: 13px;
		cursor: pointer;
		padding: 4px 6px;
	}

	.clear-all:hover {
		color: var(--container-color);
		text-decoration: underline;
	}

	@media (max-width: 769px) {
		.applied-filters {
			padding: 0 0 14px;
		}
	}
</style>

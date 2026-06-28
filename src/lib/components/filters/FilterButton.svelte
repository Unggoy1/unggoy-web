<script lang="ts">
	import { onMount } from 'svelte';
	import FilterPanel from './FilterPanel.svelte';
	import Modal from '../Modal.svelte';
	import type { BrowseData } from '$lib/api';
	import type { FilterValues } from './types';

	interface Props {
		browseData: BrowseData;
		activeCount: number;
		onApply: (values: FilterValues) => void;
		onClear: () => void;
	}

	let { browseData, activeCount, onApply, onClear }: Props = $props();

	let isMobile = $state(false);
	let open = $state(false);
	let modal: Modal | undefined = $state();
	let rootEl: HTMLDivElement;

	function checkMobile() {
		isMobile = window.innerWidth <= 768;
	}

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	function toggle() {
		if (isMobile) modal?.open();
		else open = !open;
	}

	function handleApply(values: FilterValues) {
		onApply(values);
		open = false;
		modal?.close();
	}

	function handleClear() {
		onClear();
		open = false;
		modal?.close();
	}

	// pointerdown (not click) so selecting a tag suggestion inside the popover —
	// which removes its node from the DOM — isn't misread as an outside click.
	function onWindowPointerDown(event: Event) {
		if (!isMobile && open && rootEl && !rootEl.contains(event.target as Node)) open = false;
	}

	function onWindowKey(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}
</script>

<svelte:window onpointerdown={onWindowPointerDown} onkeydown={onWindowKey} />

<div class="filter-button-root" bind:this={rootEl}>
	<button
		type="button"
		class="filter-trigger"
		class:active={activeCount > 0}
		aria-expanded={open}
		onclick={toggle}
	>
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
			<path
				d="M3 5h18l-7 8v6l-4 2v-8L3 5z"
				stroke="currentColor"
				stroke-width="2"
				stroke-linejoin="round"
			/>
		</svg>
		<span class="trigger-label">Filters</span>
		{#if activeCount > 0}
			<span class="count-badge">{activeCount}</span>
		{/if}
	</button>

	{#if !isMobile && open}
		<div class="filter-popover">
			<FilterPanel {browseData} onApply={handleApply} onClear={handleClear} />
		</div>
	{/if}
</div>

{#if isMobile}
	<Modal bind:this={modal} slideUp={true}>
		<h3 class="filter-sheet-title">Filters</h3>
		<FilterPanel
			{browseData}
			onApply={handleApply}
			onClear={handleClear}
			showPageSize={true}
		/>
		{#snippet commands()}{/snippet}
	</Modal>
{/if}

<style>
	.filter-button-root {
		position: relative;
		flex-shrink: 0;
	}

	.filter-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 48px;
		padding: 0 16px;
		border: 2px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		background: var(--container-bg);
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 14px;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.filter-trigger:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	.filter-trigger.active {
		background: var(--button-bg);
		border-color: transparent;
		color: var(--button-color);
	}

	.count-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		padding: 0 6px;
		border-radius: 10px;
		background: var(--button-color);
		color: var(--button-bg);
		font-family: var(--hud-font);
		font-size: 11px;
		font-weight: 600;
	}

	.filter-popover {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 50;
		width: 340px;
		max-width: calc(100vw - 32px);
		padding: 18px;
		background: var(--container-bg);
		border: 1px solid rgba(207, 231, 238, 0.14);
		border-radius: 12px;
		box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
	}

	.filter-sheet-title {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 18px;
		color: var(--container-color);
	}

	/* Icon-only trigger on mobile so per-page · sort · order · Filters fit one row. */
	@media (max-width: 768px) {
		.filter-trigger {
			gap: 6px;
			padding: 0 14px;
		}
		.trigger-label {
			display: none;
		}
	}
</style>

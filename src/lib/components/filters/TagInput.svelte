<script lang="ts">
	import { tagSearch, type TagSuggestion } from '$lib/api/tags';

	interface Props {
		tags?: string[];
		max?: number;
	}

	let { tags = $bindable([]), max = 10 }: Props = $props();

	let text = $state('');
	let open = $state(false);
	let highlighted = $state(-1);
	let suggestions = $state<TagSuggestion[]>([]);

	let rootEl: HTMLDivElement;
	let inputEl: HTMLInputElement | undefined = $state();
	let debounceTimer: ReturnType<typeof setTimeout>;
	let reqId = 0;

	const atMax = $derived(tags.length >= max);
	const trimmed = $derived(text.trim().toLowerCase());
	const showAddFree = $derived(
		trimmed.length > 0 && !suggestions.some((s) => s.tag.toLowerCase() === trimmed)
	);

	function addTag(raw: string) {
		const t = raw.trim().toLowerCase();
		if (!t || tags.includes(t) || tags.length >= max) return;
		tags = [...tags, t];
		text = '';
		suggestions = [];
		highlighted = -1;
		inputEl?.focus();
	}

	function removeTag(tag: string) {
		tags = tags.filter((t) => t !== tag);
	}

	function onInput() {
		open = true;
		highlighted = -1;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => runSuggest(text.trim()), 220);
	}

	async function runSuggest(term: string) {
		if (atMax) {
			suggestions = [];
			return;
		}
		const id = ++reqId;
		const res = await tagSearch({ searchTerm: term, count: 8 }).catch(() => null);
		if (id !== reqId) return;
		const selected = new Set(tags);
		suggestions = (res?.tags ?? []).filter((s) => !selected.has(s.tag.toLowerCase())).slice(0, 8);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (highlighted >= 0 && suggestions[highlighted]) addTag(suggestions[highlighted].tag);
			else if (text.trim()) addTag(text);
		} else if (event.key === ',') {
			event.preventDefault();
			if (text.trim()) addTag(text);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			open = true;
			highlighted = Math.min(highlighted + 1, suggestions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlighted = Math.max(highlighted - 1, 0);
		} else if (event.key === 'Escape') {
			open = false;
		} else if (event.key === 'Backspace' && text === '' && tags.length) {
			removeTag(tags[tags.length - 1]);
		}
	}

	// Open suggestions on an explicit tap/click — not on the programmatic focus the
	// Filters sheet gives this field when it opens (typing also opens, via onInput).
	function onActivate() {
		open = true;
		if (!suggestions.length) runSuggest(text.trim());
	}

	// Use pointerdown (fires before the click mutates the DOM) so selecting a
	// suggestion isn't misread as an outside click once its node is removed.
	function onWindowPointerDown(event: Event) {
		if (rootEl && !rootEl.contains(event.target as Node)) open = false;
	}
</script>

<svelte:window onpointerdown={onWindowPointerDown} />

<div class="tag-input-root" bind:this={rootEl}>
	<div class="tag-input" class:focused={open}>
		{#each tags as tag (tag)}
			<span class="tag-chip">
				{tag}
				<button
					type="button"
					class="chip-x"
					aria-label={`Remove ${tag}`}
					onclick={() => removeTag(tag)}>✕</button
				>
			</span>
		{/each}
		{#if !atMax}
			<input
				bind:this={inputEl}
				bind:value={text}
				oninput={onInput}
				onkeydown={onKeydown}
				onclick={onActivate}
				type="text"
				placeholder={tags.length ? 'Add tag…' : 'Add tags…'}
				autocomplete="off"
			/>
		{/if}
	</div>

	{#if open && !atMax && (suggestions.length || showAddFree)}
		<div class="tag-suggest" role="listbox">
			{#each suggestions as s, i (s.tag)}
				<button
					type="button"
					class="suggest-row"
					class:active={highlighted === i}
					onmouseenter={() => (highlighted = i)}
					onclick={() => addTag(s.tag)}
				>
					<span class="s-tag">{s.tag}</span>
					<span class="s-count">{s.count}</span>
				</button>
			{/each}
			{#if showAddFree}
				<button type="button" class="suggest-row add-free" onclick={() => addTag(text)}>
					Add “{text.trim()}”
				</button>
			{/if}
		</div>
	{/if}

	{#if atMax}
		<p class="tag-max-note">Up to {max} tags.</p>
	{/if}
</div>

<style>
	.tag-input-root {
		position: relative;
		width: 100%;
	}

	.tag-input {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
		min-height: 44px;
		padding: 7px 8px;
		background: var(--container-bg);
		border: 2px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		cursor: text;
	}

	.tag-input.focused {
		border-color: rgba(255, 255, 255, 0.4);
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 6px 3px 10px;
		background: var(--button-color);
		color: var(--button-bg);
		border-radius: 6px;
		font-size: 13px;
		font-weight: 500;
		white-space: nowrap;
	}

	.chip-x {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border: none;
		background: transparent;
		color: inherit;
		font-size: 11px;
		line-height: 1;
		cursor: pointer;
		opacity: 0.7;
		border-radius: 50%;
	}

	.chip-x:hover {
		opacity: 1;
		background: rgba(0, 0, 0, 0.15);
	}

	.tag-input input {
		flex: 1;
		min-width: 90px;
		border: none;
		background: transparent;
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 14px;
		outline: none;
		padding: 4px 2px;
	}

	.tag-input input::placeholder {
		color: #dee3e5bf;
	}

	.tag-suggest {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 40;
		background: var(--container-bg);
		border: 1px solid rgba(207, 231, 238, 0.12);
		border-radius: 10px;
		padding: 6px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
		max-height: 260px;
		overflow-y: auto;
	}

	.suggest-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		background: transparent;
		border-radius: 7px;
		text-align: left;
		color: var(--container-color);
		cursor: pointer;
		font-size: 14px;
		font-family: var(--body-font);
	}

	.suggest-row.active {
		background: var(--button-bg);
	}

	.suggest-row.add-free {
		color: var(--button-color);
	}

	.s-count {
		font-family: var(--hud-font);
		font-size: 11.5px;
		color: var(--sidebar-color);
	}

	.tag-max-note {
		margin: 6px 2px 0;
		font-size: 12px;
		color: var(--sidebar-color);
	}
</style>

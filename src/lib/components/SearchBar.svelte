<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { searchAll } from '$lib/api/search';
	import { creatorPath, searchPath } from '$lib/functions';

	type Suggestion =
		| { kind: 'map' | 'mode' | 'playlist'; id: string; label: string; thumb?: string }
		| { kind: 'creator'; gamertag: string; label: string; thumb?: string };

	const MIN_CHARS = 2;

	let value = $state('');
	let open = $state(false);
	let highlighted = $state(-1);
	let loading = $state(false);
	let suggestions = $state<Suggestion[]>([]);

	let rootEl: HTMLDivElement;
	let debounceTimer: ReturnType<typeof setTimeout>;
	// Discard stale responses (the base request helper has no abort signal, so we
	// gate on a request id instead of cancelling the in-flight fetch).
	let reqId = 0;

	// Reflect the active query when on /search; clear the box elsewhere. Runs on
	// initial mount and after every navigation, so it never clobbers mid-typing.
	afterNavigate(({ to }) => {
		const url = to?.url;
		value = url && url.pathname === '/search' ? (url.searchParams.get('q') ?? '') : '';
	});

	const KIND_LABEL: Record<Suggestion['kind'], string> = {
		map: 'Map',
		mode: 'Mode',
		playlist: 'Playlist',
		creator: 'Creator'
	};

	function hrefFor(s: Suggestion): string {
		if (s.kind === 'creator') return creatorPath(s.gamertag);
		if (s.kind === 'playlist') return `/playlist/${s.id}`;
		if (s.kind === 'map') return `/maps/${s.id}`;
		return `/modes/${s.id}`;
	}

	function onInput() {
		open = true;
		highlighted = -1;
		clearTimeout(debounceTimer);
		const term = value.trim();
		if (term.length < MIN_CHARS) {
			suggestions = [];
			loading = false;
			return;
		}
		loading = true;
		debounceTimer = setTimeout(() => runSuggest(term), 250);
	}

	async function runSuggest(term: string) {
		const id = ++reqId;
		const res = await searchAll({ searchTerm: term, count: 4 }).catch(() => null);
		// A newer keystroke already fired — drop this stale result.
		if (id !== reqId) return;

		// Keep the dropdown tight: a few of each kind, prefabs only on /search.
		const next: Suggestion[] = [];
		for (const c of (res?.creators?.items ?? []).slice(0, 3)) {
			next.push({ kind: 'creator', gamertag: c.gamertag, label: c.gamertag, thumb: c.emblemPath });
		}
		for (const m of (res?.maps?.items ?? []).slice(0, 4)) {
			next.push({ kind: 'map', id: m.assetId, label: m.name, thumb: m.thumbnailUrl });
		}
		for (const m of (res?.modes?.items ?? []).slice(0, 4)) {
			next.push({ kind: 'mode', id: m.assetId, label: m.name, thumb: m.thumbnailUrl });
		}
		for (const p of (res?.playlists?.items ?? []).slice(0, 3)) {
			next.push({ kind: 'playlist', id: p.assetId, label: p.name, thumb: p.thumbnailUrl });
		}
		suggestions = next;
		loading = false;
	}

	function close() {
		open = false;
		highlighted = -1;
	}

	function submitSearch() {
		const term = value.trim();
		if (!term) return;
		close();
		goto(searchPath(term));
	}

	// index 0 = the "search for …" row; 1..N = suggestions
	function activate(index: number) {
		if (index <= 0) {
			submitSearch();
			return;
		}
		const s = suggestions[index - 1];
		if (!s) {
			submitSearch();
			return;
		}
		close();
		goto(hrefFor(s));
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			activate(highlighted);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			open = true;
			highlighted = Math.min(highlighted + 1, suggestions.length);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlighted = Math.max(highlighted - 1, 0);
		} else if (event.key === 'Escape') {
			close();
		}
	}

	function onFocus() {
		if (value.trim().length >= MIN_CHARS) open = true;
	}

	function onWindowClick(event: MouseEvent) {
		if (rootEl && !rootEl.contains(event.target as Node)) close();
	}

	const showDropdown = $derived(open && value.trim().length >= MIN_CHARS);
</script>

<svelte:window onclick={onWindowClick} />

<div class="search-root" bind:this={rootEl}>
	<div class="search-bar">
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			placeholder="Search"
			autocomplete="off"
			role="combobox"
			aria-expanded={showDropdown}
			aria-controls="search-suggest"
			bind:value
			oninput={onInput}
			onkeydown={onKeydown}
			onfocus={onFocus}
		/>
	</div>

	{#if showDropdown}
		<div class="search-suggest" id="search-suggest" role="listbox">
			<button
				type="button"
				class="suggest-row all"
				class:active={highlighted <= 0}
				onmouseenter={() => (highlighted = 0)}
				onclick={submitSearch}
			>
				<span class="suggest-icon" aria-hidden="true">
					<svg viewBox="0 0 57 57" width="15" height="15" fill="currentColor">
						<path
							d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
						/>
					</svg>
				</span>
				<span class="suggest-label">Search for <strong>“{value.trim()}”</strong></span>
			</button>

			{#if loading && suggestions.length === 0}
				<div class="suggest-note">Searching…</div>
			{:else if suggestions.length === 0}
				<div class="suggest-note">No quick matches — press Enter to search everything.</div>
			{:else}
				{#each suggestions as s, i (s.kind + (s.kind === 'creator' ? s.gamertag : s.id))}
					<a
						class="suggest-row"
						class:active={highlighted === i + 1}
						href={hrefFor(s)}
						role="option"
						aria-selected={highlighted === i + 1}
						onmouseenter={() => (highlighted = i + 1)}
						onclick={close}
					>
						{#if s.thumb}
							<img class="suggest-thumb" class:emblem={s.kind === 'creator'} src={s.thumb} alt="" />
						{:else}
							<span class="suggest-thumb placeholder" aria-hidden="true"></span>
						{/if}
						<span class="suggest-label">{s.label}</span>
						<span class="suggest-kind">{KIND_LABEL[s.kind]}</span>
					</a>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.search-root {
		position: relative;
		display: flex;
		width: 100%;
		max-width: 530px;
	}

	/* Let the shared .search-bar styling drive the input; just fill the root. */
	.search-root :global(.search-bar) {
		width: 100%;
		max-width: none;
	}

	.search-suggest {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		z-index: 60;
		background: var(--container-bg);
		border: 1px solid rgba(207, 231, 238, 0.12);
		border-radius: 10px;
		padding: 6px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
		max-height: min(70vh, 460px);
		overflow-y: auto;
	}

	.suggest-row {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border: none;
		background: transparent;
		border-radius: 7px;
		text-align: left;
		text-decoration: none;
		color: var(--container-color);
		cursor: pointer;
		font-size: 14px;
		font-family: var(--body-font);
	}

	.suggest-row.active {
		background: var(--button-bg);
	}

	.suggest-row.all {
		color: var(--button-color);
	}

	.suggest-row.all + .suggest-note,
	.suggest-row.all:not(:last-child) {
		border-bottom: 1px solid rgba(207, 231, 238, 0.08);
		border-radius: 7px 7px 0 0;
	}

	.suggest-icon {
		display: inline-flex;
		width: 28px;
		justify-content: center;
		flex-shrink: 0;
		color: var(--sidebar-color);
	}

	.suggest-thumb {
		flex-shrink: 0;
		width: 40px;
		height: 26px;
		object-fit: cover;
		border-radius: 4px;
		background: var(--button-bg);
	}

	.suggest-thumb.emblem {
		width: 28px;
		height: 28px;
		object-fit: contain;
		border-radius: 0;
		background: transparent;
	}

	.suggest-thumb.placeholder {
		display: inline-block;
	}

	.suggest-label {
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.suggest-kind {
		flex-shrink: 0;
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 9.5px;
		color: var(--sidebar-color);
		border: 1px solid rgba(207, 231, 238, 0.15);
		border-radius: 4px;
		padding: 2px 6px;
	}

	.suggest-note {
		padding: 12px 12px 14px;
		font-size: 13px;
		color: var(--sidebar-color);
	}
</style>

<script lang="ts">
	import type { CreatorSummary } from '$lib/api/creator';
	import { creatorPath } from '$lib/functions';

	interface Props {
		creator: CreatorSummary;
	}

	let { creator }: Props = $props();

	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

	const owned = $derived(
		(creator.ownedMaps ?? 0) + (creator.ownedModes ?? 0) + (creator.ownedPrefabs ?? 0)
	);
	const emblem = $derived(creator.emblemPath || '/images/branding/logo-icon.svg');
</script>

<a class="creator-result" href={creatorPath(creator.gamertag)}>
	<img class="cr-emblem" src={emblem} alt="" />
	<div class="cr-body">
		<div class="cr-top">
			<span class="cr-name">{creator.gamertag}</span>
			{#if creator.serviceTag}
				<span class="cr-tag">{creator.serviceTag}</span>
			{/if}
		</div>
		<div class="cr-stats">
			<span><strong>{compact.format(creator.totalPlays ?? 0)}</strong> plays</span>
			<span class="dot" aria-hidden="true">·</span>
			<span><strong>{owned}</strong> creations</span>
		</div>
	</div>
</a>

<style>
	.creator-result {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 16px;
		background: var(--container-bg);
		border: 1px solid rgba(207, 231, 238, 0.08);
		border-radius: 12px;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.15s ease,
			background 0.15s ease,
			transform 0.15s ease;
	}

	.creator-result:hover,
	.creator-result:focus-visible {
		background: var(--button-bg);
		border-color: rgba(207, 231, 238, 0.22);
		transform: translateY(-2px);
		outline: none;
	}

	.creator-result:focus-visible {
		outline: 2px solid var(--button-color);
		outline-offset: 2px;
	}

	.cr-emblem {
		flex-shrink: 0;
		width: 52px;
		height: 52px;
		object-fit: contain;
	}

	.cr-body {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.cr-top {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}

	.cr-name {
		font-family: var(--display-font);
		font-weight: 600;
		font-size: 16px;
		color: var(--container-color);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cr-tag {
		flex-shrink: 0;
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-size: 10px;
		font-weight: 600;
		color: #171d1e;
		background: #dfb759;
		padding: 2px 7px;
		border-radius: 4px;
	}

	.cr-stats {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--hud-font);
		font-size: 11.5px;
		letter-spacing: 0.04em;
		color: var(--sidebar-color);
	}

	.cr-stats strong {
		color: var(--container-color);
		font-weight: 600;
	}

	.dot {
		opacity: 0.5;
	}
</style>

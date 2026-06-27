<script lang="ts">
	import { PUBLIC_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import type { CreatorProfile } from '$lib/api/creator';

	interface Props {
		creator: CreatorProfile;
		hasStats: boolean;
		backdropUrl?: string | null;
	}

	let { creator, hasStats, backdropUrl = null }: Props = $props();

	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

	const stats = $derived(creator.stats);
	const cells = $derived(
		hasStats && stats
			? [
					{ label: 'Total Plays', value: compact.format(stats.totalPlays ?? 0) },
					{ label: 'Maps', value: String(stats.ownedMaps ?? 0) },
					{ label: 'Modes', value: String(stats.ownedModes ?? 0) },
					{ label: 'Prefabs', value: String(stats.ownedPrefabs ?? 0) },
					{
						label: 'Avg Rating',
						value: stats.ratedAssetCount ? `${(stats.averageRating ?? 0).toFixed(1)}★` : '—'
					},
					{ label: 'Bookmarks', value: compact.format(stats.totalBookmarks ?? 0) }
				]
			: ['Total Plays', 'Maps', 'Modes', 'Prefabs', 'Avg Rating', 'Bookmarks'].map((label) => ({
					label,
					value: '—'
				}))
	);

	const creatorSince = $derived(
		hasStats && stats?.firstPublishedAt ? new Date(stats.firstPublishedAt).getFullYear() : null
	);

	const emblem = $derived(creator.emblemPath || '/images/branding/logo-icon.svg');

	async function copyProfileLink() {
		const base = (PUBLIC_URL || window.location.origin).replace(/\/+$/, '');
		const link = `${base}/creator/${encodeURIComponent(creator.gamertag)}`;
		await toast.promise(navigator.clipboard.writeText(link), {
			loading: 'Copying...',
			success: 'Profile link copied',
			error: 'Could not copy link'
		});
	}
</script>

<header class="hero">
	<div
		class="hero-bg"
		style:background-image={backdropUrl ? `url('${backdropUrl}')` : 'none'}
		aria-hidden="true"
	></div>
	<div class="hero-scrim" aria-hidden="true"></div>

	<div class="hero-inner">
		<div class="identity">
			<img class="emblem" src={emblem} alt="" />

			<div class="id-text">
				<p class="eyebrow">Service Record</p>
				<h1 class="gamertag">{creator.gamertag}</h1>
				<div class="id-meta">
					{#if creator.serviceTag}
						<span class="svc-tag">{creator.serviceTag}</span>
					{/if}
					{#if creatorSince}
						<span class="since">Creator since {creatorSince}</span>
					{/if}
				</div>
			</div>

			<button class="copy-link" onclick={copyProfileLink}>
				<svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
					<path
						d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 3l-1.5 1.5M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l1.5-1.5"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Copy profile link
			</button>
		</div>

		<dl class="stat-strip">
			{#each cells as cell, i}
				<div class="stat" style="--i: {i}">
					<dd class="stat-value">{cell.value}</dd>
					<dt class="stat-label">{cell.label}</dt>
				</div>
			{/each}
		</dl>
	</div>
</header>

<style>
	.hero {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		isolation: isolate;
		margin-bottom: 28px;
		background-color: var(--cr-ink);
		/* The hero sits in a flex-column (.main-container); overflow:hidden makes
		   its auto min-height 0, so without this it collapses when the page
		   content overflows. */
		flex-shrink: 0;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transform: scale(1.1);
		filter: blur(18px) saturate(1.1);
		opacity: 0.55;
		z-index: -2;
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(120% 140% at 12% 0%, rgba(127, 227, 234, 0.16), transparent 55%),
			linear-gradient(180deg, rgba(17, 23, 26, 0.6) 0%, var(--cr-ink) 86%);
	}

	.hero-inner {
		position: relative;
		padding: 32px 32px 0;
		/* Angled service-record cut along the bottom edge. */
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 22px;
	}

	.emblem {
		flex-shrink: 0;
		width: 112px;
		height: 112px;
		object-fit: contain;
	}

	.id-text {
		flex: 1;
		min-width: 0;
	}

	.eyebrow {
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.28em;
		font-size: 11px;
		color: var(--cr-cyan);
		margin: 0 0 4px;
		opacity: 0.85;
	}

	.gamertag {
		font-family: var(--display-font);
		font-weight: 700;
		font-size: clamp(28px, 4vw, 46px);
		line-height: 1.02;
		margin: 0;
		color: #fff;
		letter-spacing: 0.01em;
		word-break: break-word;
	}

	.id-meta {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 10px;
		flex-wrap: wrap;
	}

	.svc-tag {
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 12px;
		color: var(--cr-ink);
		background: var(--cr-gold);
		padding: 3px 10px;
		border-radius: 4px;
		font-weight: 600;
	}

	.since {
		font-family: var(--hud-font);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--sidebar-color);
	}

	.copy-link {
		flex-shrink: 0;
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--hud-font);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--cr-cyan);
		background: rgba(127, 227, 234, 0.08);
		border: 1px solid var(--cr-hairline);
		border-radius: 8px;
		padding: 9px 14px;
		cursor: pointer;
	}

	.copy-link:hover {
		background: rgba(127, 227, 234, 0.16);
		border-color: rgba(127, 227, 234, 0.4);
	}

	/* Service-record stat strip */
	.stat-strip {
		display: flex;
		flex-wrap: wrap;
		margin: 26px 0 0;
		border-top: 1px solid var(--cr-hairline);
	}

	.stat {
		flex: 1 1 0;
		min-width: 96px;
		padding: 16px 18px 20px;
		border-right: 1px solid var(--cr-hairline);
		animation: rise 0.5s ease-out backwards;
		animation-delay: calc(0.12s + var(--i) * 0.06s);
	}

	.stat:last-child {
		border-right: none;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	.stat-value {
		font-family: var(--display-font);
		font-weight: 600;
		font-size: 26px;
		line-height: 1;
		margin: 0 0 6px;
		color: #fff;
	}

	.stat-label {
		font-family: var(--hud-font);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-size: 10.5px;
		color: var(--sidebar-color);
	}

	/* Tablet / mobile */
	@media (max-width: 769px) {
		.hero-inner {
			padding: 24px 18px 0;
		}

		.identity {
			flex-direction: column;
			text-align: center;
			gap: 14px;
		}

		.id-meta {
			justify-content: center;
		}

		.copy-link {
			align-self: center;
		}

		.stat-strip {
			margin-top: 20px;
		}

		.stat {
			flex: 1 1 33.333%;
			min-width: 0;
			border-bottom: 1px solid var(--cr-hairline);
			padding: 14px 10px 16px;
			text-align: center;
		}

		/* 3-up grid: remove right border on every 3rd cell */
		.stat:nth-child(3n) {
			border-right: none;
		}

		.stat-value {
			font-size: 22px;
		}
	}

	@media (max-width: 420px) {
		.stat {
			flex-basis: 50%;
		}
		.stat:nth-child(3n) {
			border-right: 1px solid var(--cr-hairline);
		}
		.stat:nth-child(2n) {
			border-right: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.stat {
			animation: none;
		}
		.hero-bg {
			filter: blur(18px);
		}
	}
</style>

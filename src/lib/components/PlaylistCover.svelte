<script lang="ts">
	import { planCover, coverColor, COVER_CONFIG } from '$lib/covers';

	interface Props {
		name: string;
		thumbnailUrl?: string | null;
	}

	let { name, thumbnailUrl = null }: Props = $props();

	// If the cover image fails to load, fall back to the tinted placeholder.
	let imageFailed = $state(false);

	const plan = $derived(planCover({ name, thumbnailUrl }));
	const tint = $derived(coverColor(name));
</script>

<div class="cover">
	{#if plan.kind === 'image' && !imageFailed}
		<img
			class="cover-fill"
			src={plan.src}
			alt={name}
			loading="lazy"
			onerror={() => (imageFailed = true)}
		/>
	{:else}
		<img
			class="cover-fill"
			src={COVER_CONFIG.placeholderSrc}
			alt=""
			aria-hidden="true"
			loading="lazy"
		/>
		<div
			class="cover-tint"
			aria-hidden="true"
			style:background-color={tint}
			style:mix-blend-mode={COVER_CONFIG.tintBlendMode}
			style:opacity={COVER_CONFIG.tintStrength}
		></div>
	{/if}
</div>

<style>
	.cover {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		isolation: isolate;
	}

	.cover-fill {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cover-tint {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
</style>

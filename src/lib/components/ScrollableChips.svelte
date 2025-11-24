<script lang="ts">
	interface Chip {
		id: string;
		label: string;
	}

	interface Props {
		chips: Chip[];
		activeChip: string;
		onChipClick: (chipId: string) => void;
	}

	let { chips, activeChip = $bindable(), onChipClick }: Props = $props();
</script>

<div class="chips-scroll-container">
	{#each chips as chip}
		<button
			class="chip"
			class:active={activeChip === chip.id}
			onclick={() => onChipClick(chip.id)}
		>
			{chip.label}
		</button>
	{/each}
</div>

<style>
	.chips-scroll-container {
		display: flex;
		gap: 10px;
		overflow-x: auto;
		overflow-y: hidden;
		margin-bottom: 12px;
		/* Hide scrollbar */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.chips-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.chip {
		flex-shrink: 0;
		padding: 10px 16px;
		background-color: var(--button-bg);
		border: none;
		border-radius: 6px;
		color: var(--container-color);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.2s ease;
	}

	.chip:hover {
		background-color: var(--button-bg-hover);
	}

	.chip.active {
		background-color: var(--button-color);
		color: var(--button-bg);
	}
</style>

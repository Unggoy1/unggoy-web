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

	function handleChipClick(chipId: string) {
		onChipClick(chipId);
	}
</script>

<div class="navigation-chips-container">
	<div class="navigation-chips">
		{#each chips as chip}
			<button
				class="nav-chip"
				class:active={activeChip === chip.id}
				onclick={() => handleChipClick(chip.id)}
			>
				{chip.label}
			</button>
		{/each}
	</div>
</div>

<style>
.navigation-chips-container {
	overflow-x: auto;
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;
	-ms-overflow-style: none;
	margin-bottom: 12px;
}

.navigation-chips-container::-webkit-scrollbar {
	display: none;
}

.navigation-chips {
	display: flex;
	gap: 10px;
}

.nav-chip {
	flex-shrink: 0;
	padding: 10px 16px;
	background-color: var(--button-bg);
	border: none;
	border-radius: 6px;
	color: var(--container-color);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	white-space: nowrap;
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}

.nav-chip:hover {
	background-color: var(--button-bg-hover);
}

.nav-chip.active {
	background-color: var(--button-color);
	color: var(--button-bg);
}
</style>

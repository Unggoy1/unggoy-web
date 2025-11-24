<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	interface DrawerOption {
		icon?: any;
		text: string;
		onClick: () => void;
	}

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		options: DrawerOption[];
		fullScreen?: boolean;
	}

	let { isOpen = $bindable(), onClose, options, fullScreen = false }: Props = $props();

	let drawerRef: HTMLDivElement;

	function handleClickOutside(event: MouseEvent) {
		if (drawerRef && !drawerRef.contains(event.target as Node)) {
			onClose();
		}
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});

	function handleOptionClick(option: DrawerOption) {
		option.onClick();
		onClose();
	}
</script>

<div
	bind:this={drawerRef}
	class="slideup-drawer"
	class:open={isOpen}
	class:z-top={fullScreen}
>
	<div class="drawer-options">
		{#each options as option}
			<button onclick={() => handleOptionClick(option)} class="drawer-option">
				{#if option.icon}
					<svelte:component this={option.icon} active={false} />
				{/if}
				<span>{option.text}</span>
			</button>
		{/each}
	</div>
</div>

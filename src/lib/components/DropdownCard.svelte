<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import ChevronDown from './ChevronDown.svelte';
	import { user } from '../../stores/user';
	import { DropdownType } from '$lib/enums';
	import type { Snippet } from 'svelte';

	interface Props {
		groups: any;
	}

	let { groups }: Props = $props();

	const menu = createMenu({ label: 'Actions' });

	export function button(node: HTMLElement) {
		menu.button(node);
	}

	export function open() {
		menu.open();
	}

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail);
	}
	function click(fn) {
		fn();
		menu.close();
	}

	// prettier-ignore
</script>

<Transition show={$menu.expanded} unmount>
	<!-- <div class="menu"> -->
	<!-- 	<div class=" text-right"> -->
	<!-- 		<div class="inline-block text-left"> -->
	<div
		use:menu.items
		class="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white"
	>
		{#each groups as group}
			<div class="px-1 py-1">
				{#each group as option}
					{@const active = $menu.active === option.text}
					{#if option.type === DropdownType.A}
						<a
							use:menu.item
							href={option.href}
							class="menu-item flex w-full items-center rounded-md {active
								? 'menu-item-active'
								: 'menu-item-inactive'}"
						>
							<svelte:component this={option.icon} class="mr-2 h-5 w-5" {active} />
							{option.text}
						</a>
					{:else if option.type === DropdownType.Button}
						<button
							use:menu.item
							onclick={() => {
								option.function();
								menu.close();
							}}
							class="menu-item flex w-full items-center rounded-md {active
								? 'menu-item-active'
								: 'menu-item-inactive'}"
						>
							<svelte:component this={option.icon} class="mr-2 h-5 w-5" {active} />
							{option.text}
						</button>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </div> -->
</Transition>

<style>
	.menu {
		display: flex;
		align-items: center;
		padding-left: 20px;
		flex-shrink: 0;
		margin-left: auto;
	}
	.menu-button {
		width: 64px;
		height: 64px;
		border-radius: 100px;
		background-color: var(--button-bg);
		color: var(--button-color);
	}
	.menu-button svg {
		width: 32px;
		height: 64px;
	}

	.menu-item {
		padding: 8px;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 140%; /* 22.4px */
	}
	.mt-2 {
		margin-top: 20px;
	}
</style>

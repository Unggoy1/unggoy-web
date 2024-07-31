<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import { DropdownType } from '$lib/enums';

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
</script>

<Transition show={$menu.expanded} unmount>
	<div
		use:menu.items
		class="z-20 absolute shadow right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white"
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
								option.function(option.params);
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
</Transition>

<style>
	.shadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
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

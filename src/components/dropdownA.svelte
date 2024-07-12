<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import ChevronDown from './ChevronDown.svelte';
	import { user } from '../stores/user';
	import { DropdownType } from '$lib/enums';

	const menu = createMenu({ label: 'Actions' });

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail);
	}

	// prettier-ignore
	export let groups;
</script>

<div class="user-settings">
	<div class=" text-right">
		<div class="relative inline-block text-left">
			<div use:menu.button on:select={onSelect} class="user-settings">
				<img class="user-img" src="/emblems/popculture_dealerschoice_bigfoot_emblem.png" alt="" />
				<div class="user-name">{$user.username}</div>
				<ChevronDown></ChevronDown>
			</div>

			<Transition show={$menu.expanded}>
				<div
					use:menu.items
					class="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white"
				>
					{#each groups as group}
						<div class="tt px-1 py-1">
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
										on:click={() => {
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
			</Transition>
		</div>
	</div>
</div>

<style>
	.menu {
		width: 64px;
		height: 64px;
		float: right;
		background-color: var(--button-bg);
		border-radius: 100px;
		margin-right: 16px;
		text-align: center;
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
</style>

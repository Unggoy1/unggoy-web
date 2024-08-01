<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import { createCombobox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Selector from './Selector.svelte';
	import Check from './Check.svelte';

	const menu = createMenu({ label: 'Actions' });
	let searchInput: string;

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail);
	}

	function onInput(e) {
		console.log(searchInput);
	}

	// prettier-ignore
	export let groups;

	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' }
	];
	const combobox = createCombobox({ label: 'Actions' });
	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected);
	}

	$: filtered = people.filter((person) =>
		person.name
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);
</script>

<div class="elipsis">
	<div class=" text-right">
		<div class="relative inline-block text-left">
			<button use:menu.button on:select={onSelect} class="menu-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="35"
					height="32"
					viewBox="0 0 35 32"
					fill="none"
				>
					<path
						d="M7.91838 13.3333C6.38967 13.3333 5.13892 14.5333 5.13892 16C5.13892 17.4666 6.38967 18.6666 7.91838 18.6666C9.44708 18.6666 10.6978 17.4666 10.6978 16C10.6978 14.5333 9.44708 13.3333 7.91838 13.3333ZM27.3746 13.3333C25.8459 13.3333 24.5951 14.5333 24.5951 16C24.5951 17.4666 25.8459 18.6666 27.3746 18.6666C28.9033 18.6666 30.1541 17.4666 30.1541 16C30.1541 14.5333 28.9033 13.3333 27.3746 13.3333ZM17.6465 13.3333C16.1178 13.3333 14.867 14.5333 14.867 16C14.867 17.4666 16.1178 18.6666 17.6465 18.6666C19.1752 18.6666 20.426 17.4666 20.426 16C20.426 14.5333 19.1752 13.3333 17.6465 13.3333Z"
						fill="#CEE7EE"
					/>
				</svg>
			</button>

			<Transition show={$menu.expanded}>
				<div
					use:menu.items
					class="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white"
				>
					{#each groups as group}
						<div class="px-1 py-1">
							{#each group as option}
								{@const active = $menu.active === option.text}
								<button
									use:menu.item
									class="menu-item flex w-full items-center rounded-md {active
										? 'menu-item-active'
										: 'menu-item-inactive'}"
								>
									<svelte:component this={option.icon} class="mr-2 h-5 w-5" {active} />
									{option.text}
								</button>
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

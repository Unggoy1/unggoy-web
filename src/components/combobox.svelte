<script lang="ts">
	import { createCombobox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Selector from './Selector.svelte';
	import Check from './Check.svelte';

	// prettier-ignore
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	const combobox = createCombobox({ label: 'Actions', selected: people[2] });

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

<div class="flex w-full flex-col items-center justify-center">
	<div class=" top-16 w-72">
		<div class="relative mt-1">
			<div
				class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300"
			>
				<input
					use:combobox.input
					on:change={onChange}
					class="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
					value={$combobox.selected.name}
				/>
				<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
				<button
					use:combobox.button
					class="absolute inset-y-0 right-0 flex items-center pr-2"
					type="button"
				>
					<Selector class="h-5 w-5 text-gray-400" />
				</button>
			</div>

			<Transition show={$combobox.expanded} on:after-leave={() => combobox.reset()}>
				<ul
					use:combobox.items
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each filtered as value}
						{@const active = $combobox.active === value}
						{@const selected = $combobox.selected === value}
						<li
							class="relative cursor-default select-none py-2 pl-10 pr-4 {active
								? 'bg-teal-600 text-white'
								: 'text-gray-900'}"
							use:combobox.item={{ value }}
						>
							<span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
								>{value.name}</span
							>
						</li>
					{:else}
						<li class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
							<span class="block truncate font-normal">Nothing found</span>
						</li>
					{/each}
				</ul>
			</Transition>
		</div>
	</div>
</div>

<style>
	.absolute {
		position: absolute;
	}
	.relative {
		position: relative;
	}
	.inset-y-0 {
		top: 0px;
		bottom: 0px;
	}
	.right-0 {
		right: 0px;
	}
	.mt-1 {
		margin-top: 0.25rem;
	}
	.block {
		display: block;
	}
	.flex {
		display: flex;
	}
	.contents {
		display: contents;
	}
	.h-5 {
		height: 1.25rem;
	}
	.max-h-60 {
		max-height: 15rem;
	}
	.w-5 {
		width: 1.25rem;
	}
	.w-full {
		width: 100%;
	}
	.cursor-default {
		cursor: default;
	}
	.select-none {
		-webkit-user-select: none;
		user-select: none;
	}
	.items-center {
		align-items: center;
	}
	.overflow-auto {
		overflow: auto;
	}
	.overflow-hidden {
		overflow: hidden;
	}
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rounded-lg {
		border-radius: 0.5rem;
	}
	.rounded-md {
		border-radius: 0.375rem;
	}
	.border-none {
		border-style: none;
	}
	.bg-teal-600 {
		--tw-bg-opacity: 1;
		background-color: rgb(13 148 136 / var(--tw-bg-opacity));
	}
	.bg-white {
		--tw-bg-opacity: 1;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity));
	}
	.py-1 {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.py-2 {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.pl-10 {
		padding-left: 2.5rem;
	}
	.pl-3 {
		padding-left: 0.75rem;
	}
	.pr-10 {
		padding-right: 2.5rem;
	}
	.pr-2 {
		padding-right: 0.5rem;
	}
	.pr-4 {
		padding-right: 1rem;
	}
	.text-left {
		text-align: left;
	}
	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.font-normal {
		font-weight: 400;
	}
	.leading-5 {
		line-height: 1.25rem;
	}
	.text-gray-400 {
		--tw-text-opacity: 1;
		color: rgb(156 163 175 / var(--tw-text-opacity));
	}
	.text-gray-900 {
		--tw-text-opacity: 1;
		color: rgb(17 24 39 / var(--tw-text-opacity));
	}
	.text-white {
		--tw-text-opacity: 1;
		color: rgb(255 255 255 / var(--tw-text-opacity));
	}
	.shadow-lg {
		--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
			0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	.shadow-md {
		--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
			0 2px 4px -2px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	.outline-none {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	.ring-0 {
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
	}
	.ring-1 {
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
	}
	.ring-black {
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(0 0 0 / var(--tw-ring-opacity));
	}
	.ring-opacity-5 {
		--tw-ring-opacity: 0.05;
	}
	.focus\:outline-none:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	.focus\:ring-0:focus {
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
	}
	.focus-visible\:ring-2:focus-visible {
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
	}
	.focus-visible\:ring-white:focus-visible {
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity));
	}
	.focus-visible\:ring-opacity-75:focus-visible {
		--tw-ring-opacity: 0.75;
	}
	.focus-visible\:ring-offset-2:focus-visible {
		--tw-ring-offset-width: 2px;
	}
	.focus-visible\:ring-offset-teal-300:focus-visible {
		--tw-ring-offset-color: #5eead4;
	}
</style>

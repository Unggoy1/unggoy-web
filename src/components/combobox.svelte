<script lang="ts">
	import { createCombobox } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Selector from './Selector.svelte';
	import Check from './Check.svelte';

	// prettier-ignore
	const people = [
		{ name: 'Firefight Fridays' },
		{ name: 'Social Slayer Wacky' },
		{ name: 'Competitive 4v4' },
		{ name: 'Big Team Madness' },
		{ name: 'Action Sack' },
		{ name: 'Emus Minigames' },
		{name: 'High Charity Tuesday Night Halo'},
		{name: 'Vs Gungame Maps'},
		{name: 'TSG modes v3'},
		{name: 'Campaign/Firefight maps'},
		{name: 'Halo Remake Maps'},
		{name: 'HFT Husky Raid Competition'},

	]

	const combobox = createCombobox({ label: 'Actions', selected: people[0] });

	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected.name);
		// combobox.reset();
	}

	$: filtered = people.filter((person) =>
		person.name
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="input-container">
		<div class="z-10 cursor-default input">
			<input
				use:combobox.input
				on:select={onChange}
				class="py-2 pl-3 pr-10 leading-5 input"
				value={$combobox.selected.name}
			/>
			<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
		</div>

		<div>
			<ul use:combobox.items class="mt-1 max-h-60 w-full overflow-auto py-1">
				{#each filtered as value}
					{@const active = $combobox.active === value}
					{@const selected = $combobox.selected === value}
					<li
						class="relative cursor-default select-none py-2 pr-4 {active
							? 'bg-teal-600 text-white'
							: 'text-container'}"
						use:combobox.item={{ value }}
					>
						<span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
							>{value.name}</span
						>
					</li>
				{:else}
					<li class=" cursor-default select-none py-2 pl-10 pr-4 nothing">
						<span>Nothing found</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	ul {
		padding-left: 0px;
		scrollbar-color: var(--button-bg) var(--container-bg);
	}
	li {
		padding-left: 8px;
		border-radius: 8px;
	}
	.nothing {
		color: var(--container-color);
	}
	.absolute {
		position: absolute;
	}
	.input-container {
		width: 100%;
	}

	.input {
		background-color: #303637;
		outline: #3f484b solid 2px !important;
		color: var(--container-color);
		border-radius: 8px;
		width: 100%;
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
		background-color: var(--button-bg);
		color: var(--button-color);
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
</style>

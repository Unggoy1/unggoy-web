<script lang="ts">
	import { createCombobox } from 'svelte-headlessui';
	import { createEventDispatcher, onMount } from 'svelte';
	import { user } from '../../stores/user';
	import { playlistStore } from '../../stores/playlist';
	const dispatcher = createEventDispatcher();

	// prettier-ignore
	export let playlists = []
	const combobox = createCombobox({ label: 'Playlists', selected: '' });

	function onChange(e: Event) {
		if ((e as CustomEvent).detail?.selected?.name) {
			dispatcher('select', {
				playlistId: (e as CustomEvent).detail.selected.assetId,
				name: (e as CustomEvent).detail.selected.name
			});
		}
		// combobox.reset();
	}

	$: filtered = playlists.filter((playlist) =>
		playlist.name
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);

	onMount(() => {
		const unsubscribe = playlistStore.subscribe((value) => {
			playlists = value;
		});

		return unsubscribe;
	});
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
		scrollbar-width: thin;
		scrollbar-color: var(--button-bg) var(--theme-bg);
	}

	ul::-webkit-scrollbar {
		width: 8px;
	}

	ul::-webkit-scrollbar-track {
		background: var(--theme-bg);
		border-radius: 4px;
	}

	ul::-webkit-scrollbar-thumb {
		background: var(--button-bg);
		border-radius: 4px;
	}

	ul::-webkit-scrollbar-thumb:hover {
		background: var(--button-bg-hover);
	}
	li {
		padding-left: 8px;
		border-radius: 8px;
	}
	.nothing {
		color: var(--container-color);
	}
	/* .absolute { */
	/* 	position: absolute; */
	/* } */
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
	/* .inset-y-0 { */
	/* 	top: 0px; */
	/* 	bottom: 0px; */
	/* } */
	/* .right-0 { */
	/* 	right: 0px; */
	/* } */
	.mt-1 {
		margin-top: 0.25rem;
	}
	.block {
		display: block;
	}
	.flex {
		display: flex;
	}
	/* .contents { */
	/* 	display: contents; */
	/* } */
	/* .h-5 { */
	/* 	height: 1.25rem; */
	/* } */
	.max-h-60 {
		max-height: 360px;
	}
	/* .w-5 { */
	/* 	width: 1.25rem; */
	/* } */
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
	/* .overflow-hidden { */
	/* 	overflow: hidden; */
	/* } */
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* .rounded-lg { */
	/* 	border-radius: 0.5rem; */
	/* } */
	/* .rounded-md { */
	/* 	border-radius: 0.375rem; */
	/* } */
	/* .border-none { */
	/* 	border-style: none; */
	/* } */
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
	/* .pr-2 { */
	/* 	padding-right: 0.5rem; */
	/* } */
	.pr-4 {
		padding-right: 1rem;
	}
	/* .text-left { */
	/* 	text-align: left; */
	/* } */
	/* .text-sm { */
	/* 	font-size: 0.875rem; */
	/* 	line-height: 1.25rem; */
	/* } */
	.font-normal {
		font-weight: 400;
	}
	.leading-5 {
		line-height: 1.25rem;
	}
</style>

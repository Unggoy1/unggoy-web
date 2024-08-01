<script lang="ts">
	import Modal from './Modal.svelte';
	import Combobox from './Combobox.svelte';
	// import { emptyDetails, type Details } from './details';
	import { playlistAddAsset, playlistCreate, playlistUpdate } from '$lib/api/playlist';

	let modal: Modal;
	let details: any = $state({});
	let mode = $state<'edit' | 'create'>('edit');

	export function create({ assetId }: { assetId?: string }) {
		mode = 'create';
		return show({ assetId }); //emptyDetails;
	}

	export function edit(value: any) {
		mode = 'edit';
		return show(value);
	}

	let resolve: (value: any | PromiseLike<any>) => void;
	let reject: (reason?: any) => void;

	function show(value: any) {
		return new Promise<any>((resolve_, reject_) => {
			resolve = resolve_;
			reject = reject_;

			details = structuredClone($state.snapshot(value));
			modal.open();
		});
	}

	async function save() {
		details.isPrivate = false;
		details.thumbnail =
			'https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/fa185860-98bd-4e63-bc3d-914b98e77330/37f416ca-b5f8-4b22-899d-6f0ff80cbdb9/images/thumbnail.jpg';
		mode === 'create' ? await playlistCreate(details) : await playlistUpdate(details);
		modal.close();
		resolve(details);
	}

	function cancel() {
		modal.close();
		reject();
	}
</script>

<Modal bind:this={modal} onclose={cancel}>
	<h3 class="text-lg font-medium leading-6">Create new playlist</h3>

	<div class="flex w-full flex-col items-center justify-center">
		<div class="input-container">
			<div class="z-10 cursor-default input">
				<label>
					<div>Name</div>
					<input bind:value={details.name} class="py-2 pl-3 pr-10 leading-5" />
				</label>
				<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
			</div>
			<div class="z-10 cursor-default input">
				<label>
					<div>Description</div>
					<textarea
						bind:value={details.description}
						maxlength="255"
						class="py-2 pl-3 pr-10 leading-5"
					></textarea>
				</label>
				<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
			</div>

			<div class="mt-4"></div>
		</div>
	</div>

	{#snippet commands()}
		<button
			type="button"
			onclick={save}
			class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
		>
			{mode === 'create' ? 'Create' : 'Save'}
		</button>
		<button
			type="button"
			onclick={cancel}
			class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
		>
			Cancel
		</button>
	{/snippet}
</Modal>

<style>
	button {
		display: inline-flex;
		flex-direction: row-reverse;
	}

	.dialog-container {
		background-color: var(--container-bg);
		color: var(--container-color);
		height: 500px;
	}
	.dialog-background {
		background-color: #00000040;
	}

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
		color: var(--container-color);
		width: 100%;
		margin-bottom: 30px;
	}
	.input input,
	.input textarea {
		background-color: #303637;
		outline: #3f484b solid 2px !important;
		color: var(--container-color);
		border-radius: 8px;
		width: 100%;
	}

	.input textarea {
		max-height: 160px;
		min-height: 100px;
	}

	label div {
		padding-bottom: 8px;
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
		max-height: 360px;
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

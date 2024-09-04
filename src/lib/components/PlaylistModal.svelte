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

			<label>
				<div>Thumbnail</div>
				<div class="form">
					<div class="file-upload-wrapper" data-text={details.thumbnail}>
						<input
							name="file-upload-field"
							type="file"
							accept="image/png, image/jpeg, image/webp"
							class="file-upload-field"
							bind:files={details.thumbnail}
						/>
					</div>
				</div>
			</label>
			<div class="mt-4"></div>
		</div>
	</div>

	{#snippet commands()}
		<button
			type="button"
			onclick={save}
			class=" modal-button inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
		>
			{mode === 'create' ? 'Create' : 'Save'}
		</button>
		<button
			type="button"
			onclick={cancel}
			class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
		>
			Cancel
		</button>
	{/snippet}
</Modal>

<style>
	button {
		display: inline-flex;
		flex-direction: row-reverse;
		background-color: var(--button-bg);
		color: var(--button-color);
		margin: 0px 4px;
	}
	button:hover {
		background-color: var(--button-bg-hover);
		color: var(--button-color-hover);
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
	.flex {
		display: flex;
	}
	.w-full {
		width: 100%;
	}
	.cursor-default {
		cursor: default;
	}
	.items-center {
		align-items: center;
	}
	.rounded-md {
		border-radius: 0.375rem;
	}
	.py-2 {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.pl-3 {
		padding-left: 0.75rem;
	}
	.pr-10 {
		padding-right: 2.5rem;
	}
	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.leading-5 {
		line-height: 1.25rem;
	}

	.file-upload-wrapper {
		position: relative;
		width: 100%;
		height: 30px;
	}
	.file-upload-wrapper:after {
		content: attr(data-text);
		font-size: 14px;
		position: absolute;
		top: 2px;
		left: 75px;
		/* Adjusted left position to fit the text */
		background: #303637;
		padding: 8px 16px;
		display: block;
		width: calc(100% - 80px);
		/* Adjusted width to fit within the container */
		pointer-events: none;
		z-index: 20;
		height: 26px;
		line-height: 10px;
		color: #cdd1d2;
		border-radius: 0 5px 5px 0;
		font-weight: 300;
		outline: #3f484b solid 2px !important;
	}
	.file-upload-wrapper:before {
		content: 'Upload';
		position: absolute;
		top: 0;
		left: 0;
		/* Kept the button on the left */
		transition: all 0.3s ease-in-out;
		display: inline-block;
		height: 30px;
		background: var(--button-bg);
		color: var(--button-color);
		z-index: 25;
		font-size: 14px;
		line-height: 30px;
		padding: 0 16px;
		pointer-events: none;
		border-radius: 5px 0 0 5px;
	}
	.file-upload-wrapper:hover:before {
		background: var(--button-bg-hover);
		color: var(--button-color-hover);
	}
	.file-upload-wrapper input {
		opacity: 0;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		height: 30px;
		margin: 0;
		padding: 0;
		display: block;
		cursor: pointer;
		width: 100%;
	}
</style>

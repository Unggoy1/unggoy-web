<script lang="ts">
	import Modal from './Modal.svelte';
	import { playlistAddAsset, playlistCreate, playlistUpdate } from '$lib/api/playlist';
	import * as nsfwjs from '../../../node_modules/nsfwjs/dist/esm/index.js';
	import { onMount } from 'svelte';

	let modal: Modal;
	let details: any = $state({});
	let ogDetails: any = {};
	let mode = $state<'edit' | 'create'>('edit');
	let model: nsfwjs.NSFWJS | null = null;

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
			ogDetails = structuredClone($state.snapshot(value)); // Store a copy of original details
			modal.open();
		});
	}

	async function save() {
		details.isPrivate = false;
		mode === 'create' ? await playlistCreate(details) : await playlistUpdate(details);
		modal.close();
		resolve(details);
	}

	function cancel() {
		fileErrorMessage = '';
		nameErrorMessage = '';
		descErrorMessage = '';
		modal.close();
		reject();
	}

	let fileErrorMessage = $state('');
	let nameErrorMessage = $state('');
	let descErrorMessage = $state('');
	let inputElement: HTMLInputElement | null = null;

	async function classifyImage(event: Event) {
		if (!model || !details.thumbnail) return;
		if (details.thumbnail && details.thumbnail.length > 0) {
			fileErrorMessage = ''; // Clear any previous error messages
		}
		const file: File = details.thumbnail.item(0);
		const imageSrc = URL.createObjectURL(file);
		const img = new Image();
		img.src = imageSrc;
		img.onload = async () => {
			const predictions = await model.classify(img);
			console.log(predictions);
			const unsafeCategories = ['Porn', 'Hentai', 'Sexy'];

			// Check if any unsafe categories have high probability
			const isUnsafe = predictions.some(
				(prediction) =>
					unsafeCategories.includes(prediction.className) && prediction.probability > 0.31
			);

			if (isUnsafe) {
				// Dispatch an event to notify the parent about the unsafe image
				fileErrorMessage = 'Image is NSFW';

				if (inputElement) inputElement.value = ''; // Clear the file input
			}

			// Clean up the object URL to prevent memory leaks
			URL.revokeObjectURL(imageSrc);
		};
	}
	function validateInput(event: any) {
		const type = event.target.type;
		const value: string = event.target.value;
		const minValue = type === 'text' ? 4 : 10;
		let error = '';

		if (value == '') {
			error = 'Please fill out this vield.';
		} else {
			if (value.length < minValue || value.length > 255) {
				error = 'Input needs at least ' + minValue + ' characters.';
			}
		}

		if (type === 'text') {
			nameErrorMessage = error;
		} else {
			descErrorMessage = error;
		}

		console.log(event);
	}

	function isDisabled() {
		if (nameErrorMessage || descErrorMessage || fileErrorMessage) {
			return true;
		}
		if (
			mode === 'edit' &&
			details.name === ogDetails.name &&
			details.thumbnail === ogDetails.thumbnail
		) {
			return true;
		}
		if (mode === 'create' && (!details.name || !details.description || !details.thumbnail)) {
			return true;
		}

		return false;
	}

	onMount(async () => {
		model = await nsfwjs.load(
			'https://nsfw-model-1.s3.us-west-2.amazonaws.com/nsfw-predict-model/',
			// @ts-ignore
			{ type: 'graph' }
		);
	});
</script>

<Modal bind:this={modal} onclose={cancel}>
	<h3 class="text-lg font-medium leading-6">Create new playlist</h3>

	<div class="flex w-full flex-col items-center justify-center">
		<div class="input-container">
			<form onsubmit={save}>
				<div class="z-10 cursor-default input">
					<label>
						<div>Name</div>
						<input
							type="text"
							bind:value={details.name}
							class="py-2 pl-3 pr-10 leading-5"
							class:error={nameErrorMessage}
							minLength="4"
							maxLength="255"
							onchange={validateInput}
							required={mode === 'create' ? true : false}
						/>
					</label>
					<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
					{#if nameErrorMessage}
						<div class="error-message">{nameErrorMessage}</div>
					{/if}
				</div>
				<div class="z-10 cursor-default input">
					<label>
						<div>Description</div>
						<textarea
							bind:value={details.description}
							maxlength="255"
							class="py-2 pl-3 pr-10 leading-5"
							class:error={descErrorMessage}
							minLength="10"
							maxLength="255"
							onchange={validateInput}
							required={mode === 'create' ? true : false}
						></textarea>
					</label>
					<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
					{#if descErrorMessage}
						<div class="error-message">{descErrorMessage}</div>
					{/if}
				</div>

				<label for="file-upload-field">
					<div class="input-label">
						<div>Thumbnail</div>
					</div>
				</label>
				<div class="form">
					<div
						class="file-upload-wrapper"
						class:img-error={fileErrorMessage}
						data-text={details.thumbnail ? details.thumbnail[0]?.name : ''}
					>
						<input
							name="file-upload-field"
							id="file-upload-field"
							type="file"
							accept="image/png, image/jpeg, image/webp"
							class="file-upload-field"
							bind:files={details.thumbnail}
							bind:this={inputElement}
							onchange={classifyImage}
							required={mode === 'create' ? true : false}
						/>
					</div>

					{#if fileErrorMessage}
						<div class="error-message">{fileErrorMessage}</div>
					{/if}
					<!-- Conditionally use the NSFW checker when a file is selected -->
					<!-- {#if details.thumbnail} -->
					<!-- 	<NsfwChecker file={details.thumbnail.item(0)} on:unsafeImage={handleUnsafeImage} /> -->
					<!-- {/if} -->
				</div>
				<div class="mt-4"></div>
			</form>
		</div>
	</div>

	{#snippet commands()}
		<button
			type="button"
			onclick={save}
			disabled={isDisabled()}
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

	button:disabled {
		background-color: var(--button-disabled-bg);
		color: var(--button-disabled-color);
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
		outline: #3f484b solid 2px;
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
		height: 35px;
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
		height: 31px;
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
		height: 35px;
		background: var(--button-bg);
		color: var(--button-color);
		z-index: 25;
		font-size: 14px;
		line-height: 35px;
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
	.input-label {
		display: flex;
	}
	.error-message {
		padding-top: 8px;
		color: #e23636;
	}

	.error {
		outline: #e23636 solid 2px !important;
	}
	.file-upload-wrapper.img-error:after {
		outline: #e23636 solid 2px !important;
	}
</style>

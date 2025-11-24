<script lang="ts">
	import type { BrowseData } from '$lib/api';
	import Modal from './Modal.svelte';

	let modal: Modal;
	let details: Partial<BrowseData> = $state({
		totalResults: undefined,
		currentPage: undefined,
		sort: undefined,
		order: undefined,
		filter: undefined,
		gamertag: undefined,
		ownerOnly: undefined,
		hide343Assets: undefined,
		tag: undefined
	});
	let ogDetails: any = {};

	export function create(value: Partial<BrowseData>) {
		return show(value); //emptyDetails;
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
		modal.close();
		resolve(details);
	}

	function cancel() {
		modal.close();
		reject();
	}
</script>

<Modal bind:this={modal} onclose={cancel} slideUp={true}>
	<h3 class="text-lg font-medium leading-6">Filter Search Results</h3>

	<div class="flex w-full flex-col items-center justify-center">
		<div class="input-container">
			{#if details.filter !== undefined}
				<div class="modal-filter-group">
					<div class="text-on-input">
						<label>Asset Type</label>
						<select bind:value={details.filter} class="filter-select">
							<option value="">All Types</option>
							<option value="Map">Maps</option>
							<option value="UgcGameVariant">Modes</option>
							<option value="Prefab">Prefabs</option>
						</select>
					</div>
				</div>
			{/if}

			{#if details.tag !== undefined}
				<div class="modal-filter-group">
					<!-- <p class="filter-text">Tags:</p> -->
					<div class="search-bar-filter">
						<div class="text-on-input">
							<label>Tag</label>
							<input bind:value={details.tag} type="text" placeholder="tag" />
						</div>
					</div>
				</div>
			{/if}

			{#if details.gamertag !== undefined}
				<div class="modal-filter-group">
					<!-- <p class="filter-text">Contributor:</p> -->
					<div class="search-bar-filter">
						<div class="text-on-input">
							<label>Contributor</label>
							<input bind:value={details.gamertag} type="text" placeholder="gamertag" />
						</div>
					</div>
				</div>
			{/if}
			{#if details.ownerOnly !== undefined}
				<!-- Toggle Input with Label -->
				<div class="toggle-group modal">
					<p class="filter-text">Only owned assets:</p>
					<label class="toggle">
						<input type="checkbox" bind:checked={details.ownerOnly} />
						<span class="slider"></span>
					</label>
				</div>
			{/if}
			{#if details.hide343Assets !== undefined}
				<!-- Toggle Input with Label -->
				<div class="toggle-group modal">
					<p class="filter-text">Hide 343 assets:</p>
					<label class="toggle">
						<input type="checkbox" bind:checked={details.hide343Assets} />
						<span class="slider"></span>
					</label>
				</div>
			{/if}

			<div class="mt-4"></div>
		</div>
	</div>

	{#snippet commands()}
		<button
			type="button"
			onclick={save}
			class=" modal-button inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
		>
			Submit
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
	.modal-filter-group {
		padding-bottom: 30px;
	}
	toggle-group.modal {
		display: flex;
		align-items: center;
		gap: 10px;
	}
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
	.required-asterisk {
		color: red;
		font-weight: bold;
		/* margin-left: 4px; */
	}

	.filter-select {
		font-size: 14px;
		width: 100%;
		height: 48px;
		color: var(--container-color);
		border-radius: 8px;
		border: 2px solid rgba(255, 255, 255, 0.08);
		background: var(--container-bg);
		padding: 14px 40px 14px 14px;
		cursor: pointer;
		outline: none;
		transition: border-color 0.2s ease;
	}

	.filter-select:hover {
		border-color: rgba(255, 255, 255, 0.12);
	}

	.filter-select:focus {
		border-color: rgba(255, 255, 255, 0.16);
	}
</style>

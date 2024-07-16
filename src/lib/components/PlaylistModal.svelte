<script lang="ts">
	import Modal from './Modal.svelte';
	import Combobox from './Combobox.svelte';
	// import { emptyDetails, type Details } from './details';
	import { user } from '../../stores/user';

	let modal: Modal;
	// let details: Details = $state(emptyDetails);
	let mode = $state<'edit' | 'create'>('edit');

	export function create() {
		mode = 'create';
		return show({});
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

			// make a copy of the object so our bound inputs don't mutate the original
			// details = structuredClone($state.snapshot(value));
			modal.open();
		});
	}

	function save(e: CustomEvent) {
		console.log(e.detail.playlist);

		// modal.close();
		resolve({});
	}

	function cancel() {
		modal.close();
		reject();
	}
</script>

<Modal bind:this={modal} onclose={cancel}>
	<h3 class="text-lg font-medium leading-6">Add to playlist...</h3>
	<Combobox on:select={save}></Combobox>

	{#snippet commands()}
		<!-- <button -->
		<!-- 	type="button" -->
		<!-- 	class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto bg-indigo-600 hover:bg-indigo-500" -->
		<!-- 	onclick={save} -->
		<!-- > -->
		<!-- 	{mode === 'create' ? 'Create' : 'Save'} -->
		<!-- </button> -->
		<!---->
		<!-- <button -->
		<!-- 	type="button" -->
		<!-- 	class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" -->
		<!-- 	onclick={cancel} -->
		<!-- > -->
		<!-- 	Cancel -->
		<!-- </button> -->
	{/snippet}
</Modal>

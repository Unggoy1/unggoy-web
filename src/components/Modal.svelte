<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Combobox from './combobox.svelte';

	interface Props {
		children: Snippet;
		commands: Snippet;
		onclose: () => void;
	}

	let { children, commands, onclose }: Props = $props();

	const dialog = createDialog();

	function onChange(e: Event) {
		//TODO: Figure out how to set the selected playlist to null on start
		console.log('testttttt');
		dialog.close();
		// console.log('select', (e as CustomEvent).detail.selected.name);
		// dispatcher('select', { playlist: (e as CustomEvent).detail.selected.name });
		// combobox.reset();
	}
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center">
		<div class=" inset-0 flex items-center justify-center">
			<button
				type="button"
				class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				on:click={dialog.open}>Open dialog</button
			>
		</div>
	</div>

	<div class="relative z-10">
		<Transition show={$dialog.expanded}>
			<!-- <Transition> -->
			<!-- 	<button class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} /> -->
			<!-- </Transition> -->

			<div class="fixed inset-0 overflow-y-auto dialog-background">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<Transition>
						<div
							class="w-full max-w-md rounded-2xl p-6 text-left shadow-xl transition-all dialog-container"
							use:dialog.modal
						>
							<h3 class="text-lg font-medium leading-6">Add to playlist...</h3>

							<Combobox on:select={onChange}></Combobox>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</div>

<style>
	.dialog-container {
		background-color: var(--container-bg);
		color: var(--container-color);
		height: 500px;
	}
	.dialog-background {
		background-color: #00000040;
	}
</style>

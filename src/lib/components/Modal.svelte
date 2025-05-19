<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	interface Props {
		children: Snippet;
		commands?: Snippet;
		onclose?: () => void;
		extraClass?: string;
	}

	let { children, commands, onclose, extraClass = '' }: Props = $props();
	// let { onclose }: Props = $props();

	const dialog = createDialog();

	export function open() {
		dialog.open();
	}

	export function close() {
		dialog.close();
	}
</script>

<Transition show={$dialog.expanded} unmount>
	<div class="relative z-10">
		<!-- <Transition> -->
		<!-- 	<button class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} /> -->
		<!-- </Transition> -->

		<div class="fixed inset-0 overflow-y-auto dialog-background">
			<div class="flex min-h-full items-center justify-center p-4 text-center">
				<Transition>
					<div
						class="w-full max-w-md rounded-2xl p-6 text-left shadow-xl transition-all dialog-container"
						use:dialog.modal
						{onclose}
					>
						<div>{@render children()}</div>
						<div class="commands">{@render commands()}</div>
						<!-- <h3 class="text-lg font-medium leading-6">Add to playlist...</h3> -->
						<!---->
						<!-- <Combobox on:select={onChange}></Combobox> -->
					</div>
				</Transition>
			</div>
		</div>
	</div>
</Transition>

<style>
	.dialog-container {
		background-color: var(--container-bg);
		color: var(--container-color);
		min-height: 500px;
		max-height: 550px;
	}
	
	.dialog-container.extended {
		max-height: 600px;
	}
	.dialog-background {
		background-color: #00000040;
	}

	.commands {
		display: flex;
		flex-direction: row-reverse;
	}
</style>

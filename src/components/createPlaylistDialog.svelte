<script lang="ts">
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Combobox from './combobox.svelte';

	const dialog = createDialog({ label: 'Payment Success' });
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
							<h3 class="text-lg font-medium leading-6">Create new playlist</h3>

							<div class="flex w-full flex-col items-center justify-center">
								<div class="input-container">
									<div class="z-10 cursor-default input">
										<label>
											<div>Name</div>
											<input class="py-2 pl-3 pr-10 leading-5" />
										</label>
										<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
									</div>
									<div class="z-10 cursor-default input">
										<label>
											<div>Description</div>
											<textarea maxlength="255" class="py-2 pl-3 pr-10 leading-5" />
										</label>
										<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
									</div>

									<div class="mt-4">
										<button
											type="button"
											class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											on:click={dialog.close}
										>
											Got it, thanks!
										</button>
									</div>
								</div>
							</div>
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

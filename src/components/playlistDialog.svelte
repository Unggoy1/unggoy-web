<script lang="ts">
	import { createCombobox } from 'svelte-headlessui';
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import Selector from './Selector.svelte';
	import Check from './Check.svelte';
	import Combobox from './combobox.svelte';

	const dialog = createDialog({ label: 'Payment Success' });

	// prettier-ignore
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	const combobox = createCombobox({ label: 'Actions', selected: people[2] });

	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected);
	}

	$: filtered = people.filter((person) =>
		person.name
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes($combobox.filter.toLowerCase().replace(/\s+/g, ''))
	);
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
			<Transition>
				<button class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} />
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<Transition>
						<div
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							use:dialog.modal
						>
							<h3 class="text-lg font-medium leading-6 text-gray-900">Payment successful</h3>

							<Combobox></Combobox>

							<div class="mt-2">
								<p class="text-sm text-gray-500">
									Your payment has been successfully submitted. We’ve sent you an email with all of
									the details of your order.
								</p>
							</div>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									on:click={dialog.close}>Got it, thanks!</button
								>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</div>

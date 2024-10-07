<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import * as nsfwjs from '../../../node_modules/nsfwjs/dist/esm/index.js';

	export let file: File | null = null;
	const dispatch = createEventDispatcher();
	let model: nsfwjs.NSFWJS | null = null;

	// Load the NSFW model once when the component mounts
	onMount(async () => {
		model = await nsfwjs.load(
			'https://nsfw-model-1.s3.us-west-2.amazonaws.com/nsfw-predict-model/',
			// @ts-ignore
			{ type: 'graph' }
		);
		classifyImage();
	});

	// Function to classify the image and emit event if unsafe
	async function classifyImage() {
		if (!model || !file) return;

		const imageSrc = URL.createObjectURL(file);
		const img = new Image();
		img.src = imageSrc;
		img.onload = async () => {
			const predictions = await model.classify(img);
			const unsafeCategories = ['Porn', 'Hentai', 'Sexy'];

			// Check if any unsafe categories have high probability
			const isUnsafe = predictions.some(
				(prediction) =>
					unsafeCategories.includes(prediction.className) && prediction.probability > 0.0000001
			);

			if (isUnsafe) {
				// Dispatch an event to notify the parent about the unsafe image
				dispatch('unsafeImage', { message: 'The uploaded image is unsafe.' });
			}

			// Clean up the object URL to prevent memory leaks
			URL.revokeObjectURL(imageSrc);
		};
	}
</script>

<!-- No need to display the image, just perform classification -->

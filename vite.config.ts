import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			workbox: {
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10 MiB
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
	// optimizeDeps: {
	// 	include: ['@tensorflow/tfjs', 'nsfwjs']
	// },
	// ssr: {
	// 	noExternal: ['@tensorflow/tfjs', 'nsfwjs']
	// }
});

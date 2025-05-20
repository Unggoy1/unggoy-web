import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			workbox: {
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10 MiB
			}
		})
	],
	server: {
		fs: {
			allow: ['.']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

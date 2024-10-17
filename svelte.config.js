import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// prerender: {
		// 	handleHttpError: ({ path, referrer, message }) => {
		// 		console.warn(`${path} referred from ${referrer} failed to prerender: ${message}`);
		// 		// Decide whether to throw or return based on the path
		// 		if (path.startsWith('/blog/')) {
		// 			return; // Continue building, skipping this page
		// 		}
		// 		return;
		// 	},
		// 	entries: [
		// 		'/blog/api/posts/page/*',
		// 		'/blog/category/*/page/',
		// 		'/blog/category/*/page/*',
		// 		'/blog/category/page/',
		// 		'/blog/category/page/*',
		// 		'/blog/page/',
		// 		'/blog/page/*',
		// 		'/legal/',
		// 		'/legal/privacy/',
		// 		'/legal/terms/'
		// 	]
		// },
		version: {
			name: pkg.version
		}
	}
};

export default config;

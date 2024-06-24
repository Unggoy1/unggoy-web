import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url, params }) => {
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';
	// const assetId: string = url.searchParams.get('assetId');
	const assetId: string = params.slug;
	const mapsEndpoint = endpoint + 'ugc/asset/' + assetId;

	const response = await fetch(mapsEndpoint);
	const data = await response.json();
	const images: string[] = data.files.fileRelativePaths;
	const jpgFiles = images.filter((image) => image.endsWith('.jpg'));
	const pngFiles = images.filter((image) => image.endsWith('.png'));
	let filteredImages = jpgFiles.length > 0 ? jpgFiles : pngFiles;
	if (filteredImages.length > 1) {
		filteredImages = filteredImages.filter((image) => !image.startsWith('images/thumbnail.'));
	}

	data.files.fileRelativePaths = filteredImages;
	return {
		map: data
	};
};

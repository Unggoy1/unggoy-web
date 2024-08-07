import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { ugcGet, type UgcData } from '$lib/api/ugc';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url, params }) => {
	const assetId: string = params.slug;

	const data: UgcData = await ugcGet({ assetId, svelteFetch: fetch });
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

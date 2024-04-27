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

	return {
		map: data
	};
};

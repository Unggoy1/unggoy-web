import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = true;
export const load: PageLoad = async ({ fetch }) => {
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';

	const formatedFetchParams = new URLSearchParams({
		assetKind: '2',
		count: '8'
	});
	// const fetchParams: UgcFetchData = {
	// 	assetKind: '2',
	// 	count: '8'
	// };

	const ugcEndpoint = endpoint + 'ugc/browse';
	const response = await fetch(`${ugcEndpoint}?${formatedFetchParams.toString()}`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});
	const newMaps: UgcBrowseResponse = await response.json();

	formatedFetchParams.set('assetKind', '6');
	const newModeResponse = await fetch(`${ugcEndpoint}?${formatedFetchParams.toString()}`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});
	const newModes: UgcBrowseResponse = await newModeResponse.json();

	formatedFetchParams.set('sort', 'playsRecent');
	const trendingModeResponse = await fetch(`${ugcEndpoint}?${formatedFetchParams.toString()}`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});
	const trendingModes: UgcBrowseResponse = await trendingModeResponse.json();

	formatedFetchParams.set('assetKind', '2');
	const trendingMapResponse = await fetch(`${ugcEndpoint}?${formatedFetchParams.toString()}`, {
		headers: new Headers({ 'content-type': 'application/json' })
	});

	const trendingMaps: UgcBrowseResponse = await trendingMapResponse.json();

	return {
		newMaps: newMaps.assets,
		trendingMaps: trendingMaps.assets,
		newModes: newModes.assets,
		trendingModes: trendingModes.assets
	};
};

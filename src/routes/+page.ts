import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = true;
export const load: PageLoad = async ({ fetch }) => {
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';

	const fetchParams: UgcFetchData = {
		assetKind: 2,
		count: 8
	};

	const ugcEndpoint = endpoint + 'ugc/browse';
	const response = await fetch(ugcEndpoint, {
		method: 'POST',
		body: JSON.stringify(fetchParams),
		headers: new Headers({ 'content-type': 'application/json' })
	});

	const newMaps: UgcBrowseResponse = await response.json();
	fetchParams.assetKind = 6;
	const newModeResponse = await fetch(ugcEndpoint, {
		method: 'POST',
		body: JSON.stringify(fetchParams),
		headers: new Headers({ 'content-type': 'application/json' })
	});
	const newModes: UgcBrowseResponse = await newModeResponse.json();

	fetchParams.sort = 'playsRecent';
	const trendingModeResponse = await fetch(ugcEndpoint, {
		method: 'POST',
		body: JSON.stringify(fetchParams),
		headers: new Headers({ 'content-type': 'application/json' })
	});
	const trendingModes: UgcBrowseResponse = await trendingModeResponse.json();

	fetchParams.assetKind = 2;
	const trendingMapResponse = await fetch(ugcEndpoint, {
		method: 'POST',
		body: JSON.stringify(fetchParams),
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

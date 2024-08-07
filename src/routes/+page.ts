import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { ugcBrowse, type UgcBrowse, type UgcBrowseResponse } from '$lib/api/ugc';

export const ssr = true;
export const load: PageLoad = async ({ fetch }) => {
	const fetchParams: UgcBrowse = {
		svelteFetch: fetch,
		assetKind: 2,
		count: 8
	};

	const newMaps: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.assetKind = 6;
	const newModes: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.sort = 'playsRecent';
	const trendingModes: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.assetKind = 2;
	const trendingMaps: UgcBrowseResponse = await ugcBrowse(fetchParams);

	return {
		newMaps: newMaps.assets,
		trendingMaps: trendingMaps.assets,
		newModes: newModes.assets,
		trendingModes: trendingModes.assets
	};
};

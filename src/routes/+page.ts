import type { PageLoad } from './$types';
import { ugcBrowse } from '$lib/api/ugc';
import { playlistBrowse } from '$lib/api/playlist';

export const ssr = true;

// Number of items shown in each homepage row.
const HOME_COUNT = 8;

export const load: PageLoad = async ({ fetch }) => {
	// Fire every row's request at once instead of awaiting them one after another.
	// Each call gets its own params object so they don't clobber each other.
	const [newMaps, newModes, trendingMaps, trendingModes, newPlaylists, topFavoritedPlaylists] =
		await Promise.all([
			ugcBrowse({ svelteFetch: fetch, assetKind: 2, count: HOME_COUNT }),
			ugcBrowse({ svelteFetch: fetch, assetKind: 6, count: HOME_COUNT }),
			ugcBrowse({
				svelteFetch: fetch,
				assetKind: 2,
				count: HOME_COUNT,
				sort: 'playsRecent',
				hide343Assets: true
			}),
			ugcBrowse({
				svelteFetch: fetch,
				assetKind: 6,
				count: HOME_COUNT,
				sort: 'playsRecent',
				hide343Assets: true
			}),
			playlistBrowse({ svelteFetch: fetch, count: HOME_COUNT }),
			playlistBrowse({ svelteFetch: fetch, count: HOME_COUNT, sort: 'favorites' })
		]);

	return {
		newMaps: newMaps.assets,
		trendingMaps: trendingMaps.assets,
		newModes: newModes.assets,
		trendingModes: trendingModes.assets,
		newPlaylists: newPlaylists.assets,
		topFavoritedPlaylists: topFavoritedPlaylists.assets
	};
};

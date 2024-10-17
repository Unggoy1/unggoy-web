import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { ugcBrowse, type UgcBrowse, type UgcBrowseResponse } from '$lib/api/ugc';
import { playlistBrowse, type PlaylistBrowse } from '$lib/api/playlist';

export const ssr = true;
export const load: PageLoad = async ({ url, fetch }) => {
	const fetchParams: UgcBrowse = {
		svelteFetch: fetch,
		assetKind: 2,
		count: 8
	};

	const newMaps: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.assetKind = 6;
	const newModes: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.sort = 'playsRecent';
	fetchParams.hide343Assets = true;
	const trendingModes: UgcBrowseResponse = await ugcBrowse(fetchParams);

	fetchParams.assetKind = 2;
	const trendingMaps: UgcBrowseResponse = await ugcBrowse(fetchParams);

	const playlistFetchParams: PlaylistBrowse = {
		svelteFetch: fetch,
		count: 8
	};

	const newPlaylists = await playlistBrowse(playlistFetchParams);
	console.log(newPlaylists);

	playlistFetchParams.sort = 'favorites';
	const topFavoritedPlaylists = await playlistBrowse(playlistFetchParams);

	const postRes = await fetch(`${url.origin}/blog/api/posts.json`);
	const posts = await postRes.json();

	return {
		newMaps: newMaps.assets,
		trendingMaps: trendingMaps.assets,
		newModes: newModes.assets,
		trendingModes: trendingModes.assets,
		newPlaylists: newPlaylists.assets,
		topFavoritedPlaylists: topFavoritedPlaylists.assets,
		posts: posts
	};
};

import type { PageLoad } from './$types';
import { playlistMe, type PlaylistBrowse, type PlaylistBrowseResponse } from '$lib/api/playlist';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url }) => {
	const fetchParams: PlaylistBrowse = {
		svelteFetch: fetch
	};

	const page = url.searchParams.get('page');
	if (page) {
		const offset = (parseInt(page) - 1) * 20;
		fetchParams.offset = offset;
	}

	const sort = url.searchParams.get('sort');
	if (sort) {
		fetchParams.sort = sort;
	}

	const order = url.searchParams.get('order');
	if (order) {
		fetchParams.order = order;
	}

	const searchTerm = url.searchParams.get('searchTerm');
	if (searchTerm) {
		fetchParams.searchTerm = searchTerm;
	}

	const data: PlaylistBrowseResponse = await playlistMe(fetchParams);
	return {
		assets: data.assets,
		totalPages: Math.ceil(data.totalCount / data.pageSize),
		pageSize: data.pageSize,
		totalResults: data.totalCount,
		currentPage: parseInt(page) || 1,
		sort: sort || 'updatedAt',
		order: order || 'desc'
	};
};

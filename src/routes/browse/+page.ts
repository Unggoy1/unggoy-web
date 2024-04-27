import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url }) => {
	console.log(PUBLIC_API_URL);
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';
	const fetchParams: UgcFetchData = {};

	const page = url.searchParams.get('page');
	if (page) {
		console.log('Page', page);
		const offset = (parseInt(page) - 1) * 20;
		console.log(offset);
		fetchParams.offset = offset;
	}

	const assetKind = url.searchParams.get('assetKind');
	if (assetKind) {
		const assetInt = assetKind === 'Map' ? 2 : assetKind === 'Prefab' ? 4 : 6;
		fetchParams.assetKind = assetInt;
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

	const ugcEndpoint = endpoint + 'ugc/browse';
	const response = await fetch(ugcEndpoint, {
		method: 'POST',
		body: JSON.stringify(fetchParams),
		headers: new Headers({ 'content-type': 'application/json' })
	});

	const data: UgcBrowseResponse = await response.json();

	return {
		ugc: data.assets,
		totalPages: data.totalCount / data.pageSize + 1,
		pageSize: data.pageSize,
		totalResults: data.totalCount,
		currentPage: parseInt(page) || 1,
		filter: assetKind || '',
		sort: sort || 'publishedAt',
		order: order || 'desc'
	};
};

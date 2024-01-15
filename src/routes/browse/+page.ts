import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;
export const load: PageLoad = async ({ fetch, url }) => {
	console.log(PUBLIC_API_URL);
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';
	const fetchParams: UgcFetchData = {
		page: url.searchParams.get('page') || '1'
	};
	const assetKind = url.searchParams.get('assetKind');
	if (assetKind) {
		fetchParams.assetKind = assetKind;
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

	const ugcEndpoint = endpoint + 'ugc/browse?';
	const response = await fetch(ugcEndpoint + new URLSearchParams(fetchParams));

	const data: UgcBrowseResponse = await response.json();
	console.log(order);
	return {
		ugc: data.results,
		totalPages: data.totalPages,
		pageSize: data.pageSize,
		totalResults: data.totalResults,
		currentPage: parseInt(fetchParams.page) || 1,
		filter: assetKind || '',
		sort: sort || 'datepublishedutc',
		order: order || 'desc'
	};
};

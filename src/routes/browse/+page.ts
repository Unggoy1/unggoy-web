import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url }) => {
	console.log(PUBLIC_API_URL);
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3200/';
	const fetchParams: UgcFetchData = {};

	const page = url.searchParams.get('page');
	if (page) {
		const offset = (parseInt(page) - 1) * 20;
		fetchParams.offset = offset.toString();
	}

	const assetKind = url.searchParams.get('assetKind');
	if (assetKind) {
		const assetInt = assetKind === 'Map' ? 2 : assetKind === 'Prefab' ? 4 : 6;
		fetchParams.assetKind = assetInt.toString();
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

	const tagArray = url.searchParams.get('tags');
	let tags: string[];
	if (tagArray) {
		tags = tagArray.split(',');
		fetchParams.tags = tags[0];
	}
	const gamertag = url.searchParams.get('gamertag');
	if (gamertag) {
		fetchParams.gamertag = gamertag;
	}

	const formatedFetchParams = new URLSearchParams(fetchParams as Record<string, string>);
	const ugcEndpoint = endpoint + 'ugc/browse' + '?' + formatedFetchParams.toString();
	const response = await fetch(ugcEndpoint, {
		method: 'GET',
		headers: new Headers({ 'content-type': 'application/json' })
	});

	const data: UgcBrowseResponse = await response.json();

	return {
		assets: data.assets,
		totalPages: Math.ceil(data.totalCount / data.pageSize),
		pageSize: data.pageSize,
		totalResults: data.totalCount,
		currentPage: parseInt(page) || 1,
		filter: assetKind || '',
		sort: sort || 'publishedAt',
		order: order || 'desc',
		gamertag: gamertag || '',
		tag: tags ? tags[0] : ''
	};
};

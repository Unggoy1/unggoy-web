import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { type UgcBrowseResponse, type UgcBrowse, ugcBrowse } from '$lib/api/ugc';

export const ssr = true;
export const load: PageLoad = async ({ fetch, url }) => {
	const fetchParams: UgcBrowse = {
		svelteFetch: fetch
	};

	const page = url.searchParams.get('page');
	if (page) {
		const offset = (parseInt(page) - 1) * 20;
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

	const ownerOnlyString = url.searchParams.get('ownerOnly');
	let ownerOnly;
	if (ownerOnlyString) {
		ownerOnly = ownerOnlyString?.toLowerCase() === 'true';
		fetchParams.ownerOnly = ownerOnly;
	}

	const hide343AssetsString = url.searchParams.get('hide343Assets');
	let hide343Assets;
	if (hide343AssetsString) {
		hide343Assets = hide343AssetsString?.toLowerCase() === 'true';
		fetchParams.hide343Assets = hide343Assets;
	}

	const data: UgcBrowseResponse = await ugcBrowse(fetchParams);

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
		ownerOnly: ownerOnly || false,
		hide343Assets: hide343Assets || false,
		tag: tags ? tags[0] : ''
	};
};

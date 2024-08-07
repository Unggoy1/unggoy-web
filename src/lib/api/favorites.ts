import { invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { request, type Fetch, type RequestOpts } from './base';
import type { PlaylistData } from './playlist';

export async function favoritesAdd({ assetId }): Promise<void> {
	const context: RequestOpts = {
		path: '/favorites/' + assetId,
		method: 'POST'
	};

	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Added to your favorites`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function favoritesDelete({ assetId }): Promise<void> {
	const context: RequestOpts = {
		path: '/favorites/' + assetId,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Removed from your favorites`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function favoritesGet({
	sort,
	order,
	offset,
	count,
	tags,
	gamertag,
	ownerOnly,
	searchTerm,
	svelteFetch
}: FavoritesGet): Promise<FavoritesGetResponse> {
	const context: RequestOpts = {
		path: '/favorites/',
		method: 'GET',
		query: {
			sort,
			order,
			offset,
			count,
			tags,
			gamertag,
			ownerOnly,
			searchTerm
		}
	};
	try {
		const result = await request(context, svelteFetch);
		return result.json();
	} catch (error) {}
}

export interface FavoritesGet extends Fetch {
	assetKind?: number; // number 'Map' | ''UgcGameVariant'' | 'Prefab';
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	offset?: number; //number
	count?: number; //number
	tags?: string;
	gamertag?: string;
	ownerOnly?: boolean; // "boolean"
	searchTerm?: string;
}

export interface FavoritesGetResponse {
	assets: PlaylistData[];
	totalCount: number;
	pageSize: number;
}

import { invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { request, type Fetch, type RequestOpts } from './base';
export async function playlistCreate({
	name,
	description,
	isPrivate,
	thumbnail,
	assetId
}: PlaylistCreate): Promise<void> {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('description', description);
	formData.append('isPrivate', String(isPrivate));
	formData.append('assetId', assetId);
	if (thumbnail && thumbnail.item(0)) {
		formData.append('thumbnail', thumbnail.item(0));
	}
	const context: RequestOpts = {
		path: '/playlist',
		method: 'POST',
		body: formData
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => {
				return `Created new playlist`;
			},
			error: (err: Error) => err.message
		});
		// invalidateAll();
	} catch (error) {}
}

export async function playlistAddAsset({
	playlistId,
	name,
	assetId
}: PlaylistAssetData): Promise<void> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/asset/${assetId}`,
		method: 'POST'
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Adding...',
			success: (data) => `Added asset to ${name}`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function playlistDeleteAsset({
	playlistId,
	assetId
}: PlaylistAssetData): Promise<void> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/asset/${assetId}`,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Removed asset from playlist`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function playlistUpdate({
	playlistId,
	name,
	description,
	isPrivate,
	thumbnail
}: PlaylistUpdateData): Promise<void> {
	const formData = new FormData();
	if (name) {
		formData.append('name', name);
	}

	if (description) {
		formData.append('description', description);
	}

	if (isPrivate !== undefined) {
		formData.append('isPrivate', String(isPrivate));
	}

	if (thumbnail && thumbnail.item(0)) {
		formData.append('thumbnail', thumbnail.item(0));
	}

	const context: RequestOpts = {
		path: `/playlist/${playlistId}`,
		method: 'PUT',
		body: formData
	};

	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Updated playlist`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function playlistDelete({ playlistId }: PlaylistDeleteData) {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}`,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Removed asset from playlist`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function playlistGet({
	playlistId,
	assetKind,
	sort,
	order,
	offset,
	count,
	tags,
	gamertag,
	ownerOnly,
	searchTerm,
	svelteFetch
}: PlaylistGet) {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}`,
		method: 'GET',
		query: {
			assetKind,
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
	} catch (error) {
		//throw some error here about not being able to decode the data
	}
}
export async function playlistBrowse({
	sort,
	order,
	offset,
	count,
	gamertag,
	searchTerm,
	svelteFetch
}: PlaylistBrowse) {
	const context: RequestOpts = {
		path: `/playlist/browse`,
		method: 'GET',
		query: {
			sort,
			order,
			offset,
			count,
			gamertag,
			searchTerm
		}
	};
	try {
		const result = await request(context, svelteFetch);
		return result.json();
	} catch (error) {
		//throw some error here about not being able to decode the data
	}
}

export async function playlistMe({
	sort,
	order,
	offset,
	count,
	searchTerm,
	svelteFetch
}: PlaylistBrowse) {
	const context: RequestOpts = {
		path: `/playlist/me`,
		method: 'GET',
		query: {
			sort,
			order,
			offset,
			count,
			searchTerm
		}
	};
	try {
		const result = await request(context, svelteFetch);
		return result.json();
	} catch (error) {
		//throw some error here about not being able to decode the data
	}
}

export function isPlaylistCreate(details: Partial<PlaylistCreate>): details is PlaylistCreate {
	return (
		details.name !== undefined &&
		details.description !== undefined &&
		details.isPrivate !== undefined
	);
}

// Type guard to check if the object is of type PlaylistUpdateData
export function isPlaylistUpdateData(
	details: Partial<PlaylistUpdateData>
): details is PlaylistUpdateData {
	return details.playlistId !== undefined;
}

export interface PlaylistCreate {
	name: string;
	description: string;
	isPrivate: boolean;
	thumbnail?: FileList;
	assetId?: string;
}

export interface PlaylistUpdateData {
	playlistId: string;
	name?: string;
	description?: string;
	isPrivate?: boolean;
	thumbnail?: FileList;
}

export interface PlaylistAssetData {
	playlistId: string;
	assetId: string;
	name?: string;
}

export interface PlaylistDeleteData {
	playlistId: string;
}

export interface PlaylistGet extends Fetch {
	playlistId: string;
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
export interface PlaylistBrowse extends Fetch {
	sort?: string;
	order?: string;
	offset?: number;
	count?: number;
	gamertag?: string;
	searchTerm?: string;
}

export interface PlaylistFetchData {
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	offset?: number; //number
	count?: number;
	searchTerm?: string;
}

export interface PlaylistBrowseResponse {
	assets: PlaylistData[];
	totalCount: number;
	pageSize: number;
}

export interface PlaylistData {
	assetId: string;
	name: string;
	description: string;
	assetKind: number;
	thumbnailUrl: string;
	private: boolean;
	userId: string;
	recommended?: boolean;
	user?: UserData;
	_count: {
		favoritedBy: number;
	};
}

interface UserData {
	username: string;
	emblemPath: string;
}

import { goto, invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { request, type Fetch, type RequestOpts } from './base';
import { playlistStore } from '../../stores/playlist';
export async function playlistCreate({
	name,
	description,
	thumbnail,
	assetId
}: PlaylistCreate): Promise<void> {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('description', description);
	if (assetId) {
		formData.append('assetId', assetId);
	}
	if (thumbnail && thumbnail.item(0)) {
		formData.append('thumbnail', thumbnail.item(0));
	}
	const context: RequestOpts = {
		path: '/playlist',
		method: 'POST',
		body: formData
	};
	try {
		const result = await toast.promise(
			request(context).then(async (response) => {
				const data = await response.json();
				// Add the new playlist to the store
				playlistStore.add({ assetId: data.assetId, name: data.name });
				return data;
			}),
			{
				loading: 'Uploading..',
				success: (data) => {
					return `Created new playlist: ${data.name}`;
				},
				error: (err: any) => err.body.message
			}
		);

		invalidateAll();
	} catch (error) {
		console.error('Error creating playlist:', error);
	}
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
			error: (err: any) => err.body.message
		});

		await invalidateAll();
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
			error: (err: any) => err.body.message
		});

		await invalidateAll();
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
		const result = await toast.promise(
			request(context).then(async (response) => {
				const data = await response.json();
				// Update the playlist in the store
				playlistStore.updatePlaylist(data.assetId, { assetId: data.assetId, name: data.name });
				return data;
			}),
			{
				loading: 'Uploading...',
				success: (data) => `Updated playlist: ${data.name}`,
				error: (err: any) => err.body.message
			}
		);

		await invalidateAll();
	} catch (error) {
		console.error('Error updating playlist:', error);
	}
}

export async function playlistDelete({ playlistId }: PlaylistDeleteData) {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}`,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(
			request(context).then(async (response) => {
				if (!response.ok) {
					throw new Error('Failed to delete playlist');
				}
				// Remove the playlist from the store
				playlistStore.remove(playlistId);
				return response;
			}),
			{
				loading: 'Removing...',
				success: () => `Successfully deleted Playlist`,
				error: (err: any) => err.body?.message || 'Error deleting playlist'
			}
		);

		await goto('/playlist/me');
		await invalidateAll();
	} catch (error) {
		console.error('Error deleting playlist:', error);
	}
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
		return await result.json();
	} catch (error) {
		throw error;
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
		return await result.json();
	} catch (error) {
		throw error;
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
		return await result.json();
	} catch (error) {
		throw error;
	}
}

export function isPlaylistCreate(details: Partial<PlaylistCreate>): details is PlaylistCreate {
	return details.name !== undefined && details.description !== undefined;
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
		ugc?: number; // Legacy field
		ugcPairs?: number; // New field
	};
}

interface UserData {
	username: string;
	emblemPath: string;
}

export async function playlistCreatePair({
	playlistId,
	mapAssetId,
	gamemodeAssetId
}: PlaylistCreatePairData): Promise<void> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/pair`,
		method: 'POST',
		body: {
			mapAssetId,
			gamemodeAssetId
		}
	};
	
	try {
		const result = await toast.promise(request(context), {
			loading: 'Adding pair...',
			success: () => 'Pair added successfully',
			error: (err: any) => err.body?.message || 'Failed to add pair'
		});
		
		await invalidateAll();
	} catch (error) {
		console.error('Error creating pair:', error);
		throw error;
	}
}

export interface PlaylistCreatePairData {
	playlistId: string;
	mapAssetId?: string;
	gamemodeAssetId?: string;
}

import type { UgcData } from './ugc';

export interface PlaylistPair {
	id: string;
	map?: UgcData | null;
	gamemode?: UgcData | null;  
	createdAt: string;
}

export interface PlaylistPairsResponse {
	playlistId: string;
	pairs: PlaylistPair[];
	totalCount: number;
	pageSize: number;
}

export async function playlistGetPairs(
	{
		playlistId,
		assetKind,
		sort,
		order,
		count,
		offset,
		tags,
		searchTerm,
		gamertag,
		ownerOnly,
		svelteFetch
	}: PlaylistGetPairsParams
): Promise<PlaylistPairsResponse> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/pairs`,
		method: 'GET',
		query: {
			assetKind,
			sort,
			order,
			count,
			offset,
			tags,
			searchTerm,
			gamertag,
			ownerOnly
		}
	};
	
	const result = await request(context, svelteFetch);
	return await result.json();
}

export interface PlaylistGetPairsParams extends Fetch {
	playlistId: string;
	assetKind?: number;
	sort?: string;
	order?: 'desc' | 'asc';
	count?: number;
	offset?: number;
	tags?: string;
	searchTerm?: string;
	gamertag?: string;
	ownerOnly?: boolean;
}

export async function playlistUpdatePair({
	playlistId,
	pairId,
	mapAssetId,
	gamemodeAssetId
}: PlaylistUpdatePairData): Promise<void> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/pair/${pairId}`,
		method: 'PUT',
		body: {
			mapAssetId,
			gamemodeAssetId
		}
	};
	
	try {
		const result = await toast.promise(request(context), {
			loading: 'Updating pair...',
			success: () => 'Pair updated successfully',
			error: (err: any) => err.body?.message || 'Failed to update pair'
		});
		
		await invalidateAll();
	} catch (error) {
		console.error('Error updating pair:', error);
		throw error;
	}
}

export interface PlaylistUpdatePairData {
	playlistId: string;
	pairId: string;
	mapAssetId?: string;
	gamemodeAssetId?: string;
}

export async function playlistDeletePair({
	playlistId,
	pairId
}: PlaylistDeletePairData): Promise<void> {
	const context: RequestOpts = {
		path: `/playlist/${playlistId}/pair/${pairId}`,
		method: 'DELETE'
	};
	
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing pair...',
			success: () => 'Pair removed successfully',
			error: (err: any) => err.body?.message || 'Failed to remove pair'
		});
		
		await invalidateAll();
	} catch (error) {
		console.error('Error deleting pair:', error);
		throw error;
	}
}

export interface PlaylistDeletePairData {
	playlistId: string;
	pairId: string;
}

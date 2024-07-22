import { invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { request, type RequestOpts } from './base';
export async function playlistCreate({
	name,
	description,
	isPrivate,
	thumbnail,
	assetId
}: PlaylistData): Promise<void> {
	const context: RequestOpts = {
		path: '/playlist',
		method: 'POST',
		body: {
			name,
			description,
			isPrivate,
			thumbnail,
			assetId
		}
	};
	console.log(assetId);
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Removed asset from playlist`,
			error: (err: Error) => err.message
		});

		invalidateAll();
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
	const context: RequestOpts = {
		path: `/playlist/${playlistId}`,
		method: 'PUT',
		body: {
			name,
			description,
			isPrivate,
			thumbnail
		}
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

export interface PlaylistData {
	name: string;
	description: string;
	isPrivate: boolean;
	thumbnail: URL | string;
	assetId?: string;
}

export interface PlaylistUpdateData {
	playlistId: string;
	name?: string;
	description?: string;
	isPrivate?: boolean;
	thumbnail?: URL | string;
}

export interface PlaylistAssetData {
	playlistId: string;
	assetId: string;
	name?: string;
}

export interface PlaylistDeleteData {
	playlistId: string;
}

export async function test({ playlistId, assetId }) {
	try {
		const result = await toast.promise(playlistDeleteAsset({ playlistId, assetId }), {
			loading: 'Deleting...',
			success: (data) => `Deleted asset from playlist`,
			error: (err) => err.toString()
		});
		invalidateAll();
	} catch (e) {
		console.log('did we quit');
	}
}

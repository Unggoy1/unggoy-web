import { PUBLIC_URL } from '$env/static/public';
import toast from 'svelte-french-toast';
import { DropdownType } from './enums';
import Plus from './components/icons/Plus.svelte';
import Duplicate from './components/icons/Duplicate.svelte';
import Delete from './components/icons/Delete.svelte';
import { user } from '../stores/user';
import { addAssetModal, playlistModal } from '../stores/modal';
import { get } from 'svelte/store';
import { playlistDeleteAsset } from './api/playlist';
import type { PlaylistData } from './api/playlist';
export async function getAssetLink({ assetId, assetKind }) {
	const assetUrl =
		assetKind === 2 ? 'maps' : assetKind === 6 ? 'modes' : assetKind === 4 ? 'prefabs' : 'playlist';

	await toast.promise(navigator.clipboard.writeText(`${PUBLIC_URL}/${assetUrl}/${assetId}`), {
		loading: 'Copying...',
		success: 'Link copied to clipboard',
		error: 'Failed to copy link to clipboard'
	});
	navigator.clipboard.writeText(`${PUBLIC_URL}/${assetUrl}/${assetId}`);
}

export function getAssetCardGroups({
	assetId,
	assetKind,
	playlist
}: {
	assetId: string;
	assetKind: number;
	playlist?: PlaylistData;
}) {
	const activeUser = get(user);
	const addAssetModalVar = get(addAssetModal);
	const playlistModalVar = get(playlistModal);
	let authGroups;
	if (assetKind === 5) {
		authGroups = [
			{
				type: DropdownType.Button,
				icon: Plus,
				text: `Add to favorites`
			}
		];
	} else {
		authGroups = [
			{
				type: DropdownType.Button,
				icon: Plus,
				text: `Add to Playlist`,
				function: () => addAssetModalVar.create(assetId)
			},
			{
				type: DropdownType.Button,
				icon: Plus,
				text: `Add to New Playlist`,
				function: () =>
					playlistModalVar.create({
						assetId: assetId
					})
			}
		];

		if (playlist && activeUser && playlist.userId == activeUser.id) {
			authGroups.push({
				type: DropdownType.Button,
				icon: Delete,
				text: `Remove From Playlist`,
				function: () => playlistDeleteAsset({ playlistId: playlist.assetId, assetId: assetId })
			});
		}
	}
	const noAuthGroups = [
		{
			type: DropdownType.Button,
			icon: Duplicate,
			text: `Copy asset link`,
			function: () => getAssetLink({ assetId: assetId, assetKind: assetKind })
		}
	];

	return activeUser ? [authGroups, noAuthGroups] : [noAuthGroups];
}

export function removeSameValues<T extends object>(details: T, ogDetails: T): Partial<T> {
	return Object.entries(details).reduce((acc, [key, value]) => {
		if (key.toLowerCase().includes('id') || value !== ogDetails[key as keyof T]) {
			acc[key as keyof T] = value;
		}
		return acc;
	}, {} as Partial<T>);
}

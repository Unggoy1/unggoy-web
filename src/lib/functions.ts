import { PUBLIC_URL } from '$env/static/public';
import toast from 'svelte-french-toast';
import { DropdownType } from './enums';
import Plus from './components/icons/Plus.svelte';
import Duplicate from './components/icons/Duplicate.svelte';
import Delete from './components/icons/Delete.svelte';
import AddAssetModal from './components/AddAssetModal.svelte';
import PlaylistModal from './components/PlaylistModal.svelte';
import { user } from '../stores/user';
import { get } from 'svelte/store';
import { playlistDeleteAsset } from './api/playlist';
import type { PlaylistData, UgcData } from './api';
export async function getAssetLink({ assetId, assetKind }) {
	const assetUrl =
		assetKind === 2 ? 'maps' : assetKind === 6 ? 'modes' : assetKind === 4 ? 'prefabs' : 'playlist';
	console.log(assetKind);

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
	playlist,
	addAssetModal,
	playlistModal
}: {
	assetId: string;
	assetKind: number;
	addAssetModal: AddAssetModal;
	playlistModal: PlaylistModal;
	playlist?: PlaylistData;
}) {
	const activeUser = get(user);
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
				function: () => addAssetModal.create(assetId)
			},
			{
				type: DropdownType.Button,
				icon: Plus,
				text: `Add to New Playlist`,
				function: () =>
					playlistModal.create({
						assetId: assetId
					})
			}
		];

		if (playlist && activeUser && playlist.userId == activeUser.id) {
			authGroups.push({
				type: DropdownType.Button,
				icon: Delete,
				text: `Remove From Playlist`,
				function: () => playlistDeleteAsset({ playlistId: playlist.id, assetId: assetId })
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

import { PUBLIC_URL } from '$env/static/public';
import toast from 'svelte-french-toast';
import { DropdownType } from './enums';
import Plus from './components/icons/Plus.svelte';
import Duplicate from './components/icons/Duplicate.svelte';
import AddAssetModal from './components/AddAssetModal.svelte';
import PlaylistModal from './components/PlaylistModal.svelte';
import { user } from '../stores/user';
import { get } from 'svelte/store';
export async function getAssetLink({ assetId, assetKind }) {
	const assetUrl =
		assetKind === 2
			? 'maps'
			: assetKind === 6
			  ? 'modes'
			  : assetKind === 4
			    ? 'prefabs'
			    : 'playlists';
	console.log(assetKind);

	await toast.promise(navigator.clipboard.writeText(`${PUBLIC_URL}/${assetUrl}/${assetId}`), {
		loading: 'Copying...',
		success: 'Link copied to clipboard',
		error: 'Failed to copy link to clipboard'
	});
	navigator.clipboard.writeText(`${PUBLIC_URL}/${assetUrl}/${assetId}`);
}

export function getAssetCardGroups(
	ugc,
	addAssetModal: AddAssetModal,
	playlistModal: PlaylistModal
) {
	const authGroups = [
		{
			type: DropdownType.Button,
			icon: Plus,
			text: `Add to Playlist`,
			function: () => addAssetModal.create(ugc.assetId)
		},
		{
			type: DropdownType.Button,
			icon: Plus,
			text: `Add to New Playlist`,
			function: () =>
				playlistModal.create({
					assetId: ugc.assetId
				})
		}
	];

	const noAuthGroups = [
		{
			type: DropdownType.Button,
			icon: Duplicate,
			text: `Copy asset link`,
			function: () => getAssetLink({ assetId: ugc.assetId, assetKind: ugc.assetKind })
		}
	];

	return get(user) ? [authGroups, noAuthGroups] : [noAuthGroups];
}

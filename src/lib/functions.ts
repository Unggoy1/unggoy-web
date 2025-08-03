import { PUBLIC_URL } from '$env/static/public';
import toast from 'svelte-french-toast';
import { DropdownType } from './enums';
import Plus from './components/icons/Plus.svelte';
import Duplicate from './components/icons/Duplicate.svelte';
import Delete from './components/icons/Delete.svelte';
import Link from './components/icons/Link.svelte';
import { user } from '../stores/user';
import { addAssetModal, playlistModal, inlineBrowsePairingModal } from '../stores/modal';
import { get } from 'svelte/store';
import { playlistDeleteAsset } from './api/playlist';
import type { PlaylistData } from './api/playlist';

// Memoization cache for getAssetCardGroups
const groupsCache = new Map();
let lastUserState: any = null;
const CACHE_SIZE_LIMIT = 100;

export async function getAssetLink({ assetId, assetKind, isWaypoint = false }) {
	const assetType =
		assetKind === 2 ? 'maps' : assetKind === 6 ? 'modes' : assetKind === 4 ? 'prefabs' : 'playlist';

	const assetPrefix = isWaypoint ? 'https://www.halowaypoint.com/halo-infinite/ugc' : PUBLIC_URL;
	const assetUrl = `${assetPrefix}/${assetType}/${assetId}`;
	await toast.promise(navigator.clipboard.writeText(assetUrl), {
		loading: 'Copying...',
		success: 'Link copied to clipboard',
		error: 'Failed to copy link to clipboard'
	});
	// navigator.clipboard.writeText(`${PUBLIC_URL}/${assetUrl}/${assetId}/${versionId}`);
}

export function getAssetCardGroups({
	assetId,
	assetKind,
	asset,
	playlist,
	addAssetModalVar,
	playlistModalVar,
	pairedAsset,
	inlineBrowsePairingModalVar,
	isIncompletePair,
	pairData,
	activeUser
}: {
	assetId: string;
	assetKind: number;
	asset?: any;
	versionId?: string | undefined;
	playlist?: PlaylistData;
	addAssetModalVar: any;
	playlistModalVar: any;
	pairedAsset?: any;
	inlineBrowsePairingModalVar?: any;
	isIncompletePair?: boolean;
	pairData?: any;
	activeUser?: any;
}) {
	// Use provided activeUser or fallback to store (for backward compatibility)
	const currentUser = activeUser ?? get(user);
	
	// Create cache key
	const cacheKey = JSON.stringify({
		assetId,
		assetKind,
		playlistId: playlist?.assetId,
		playlistUserId: playlist?.userId,
		userId: currentUser?.id,
		isIncompletePair: !!isIncompletePair,
		hasPairedAsset: !!pairedAsset,
		pairId: pairData?.id
	});
	
	// Check cache if user state hasn't changed
	if (currentUser === lastUserState && groupsCache.has(cacheKey)) {
		return groupsCache.get(cacheKey);
	}
	
	// Clear cache if it gets too large
	if (groupsCache.size > CACHE_SIZE_LIMIT) {
		groupsCache.clear();
	}
	
	// Update user state tracker
	lastUserState = currentUser;
	// const addAssetModalVar = get(addAssetModal);
	// const playlistModalVar = get(playlistModal);
	let authGroups = [];
	if (assetKind === 5 || assetKind === 4) {  // No playlist options for playlists or prefabs
		authGroups = [];
	} else if (isIncompletePair && pairData) {
		// For incomplete pairs, show option to add the missing asset and regular playlist option
		const inlineBrowseModalVar = inlineBrowsePairingModalVar || get(inlineBrowsePairingModal);
		authGroups = [];
		
		// Add option to update the pair
		authGroups.push({
			type: DropdownType.Button,
			icon: Plus,
			text: assetKind === 2 ? 'Add Game Mode' : 'Add Map',
			function: () => {
				const playlistId = playlist?.assetId || playlist?.playlistId;
				if (inlineBrowseModalVar && playlistId) {
					inlineBrowseModalVar.open(asset, pairData, playlistId);
				}
			}
		});
		
		// Also allow adding to regular playlists
		authGroups.push({
			type: DropdownType.Button,
			icon: Plus,
			text: `Add to Playlist`,
			function: () => addAssetModalVar.create(assetId)
		});
		
		// Still allow removing from playlist
		if (playlist && currentUser && playlist.userId == currentUser.id) {
			authGroups.push({
				type: DropdownType.Button,
				icon: Delete,
				text: `Remove From Playlist`,
				function: async () => {
					const { playlistDeletePair } = await import('./api/playlist');
					await playlistDeletePair({ playlistId: playlist.assetId, pairId: pairData.id });
				}
			});
		}
	} else if (pairedAsset) {
		// For complete pairs in a playlist view
		
		// Regular authenticated user actions
		authGroups = [];
		
		if ((assetKind === 2 || assetKind === 6) && asset) {
			const inlineBrowseModalVar = inlineBrowsePairingModalVar || get(inlineBrowsePairingModal);
			authGroups.push({
				type: DropdownType.Button,
				icon: Plus,
				text: `Add Pair to Playlist`,
				function: () => {
					// Open with both assets pre-selected
					inlineBrowseModalVar?.open(asset, null, null, pairedAsset);
				}
			});
		}
		
		if (playlist && currentUser && playlist.userId == currentUser.id) {
			authGroups.push({
				type: DropdownType.Button,
				icon: Delete,
				text: `Remove From Playlist`,
				function: async () => {
					const { playlistDeletePair } = await import('./api/playlist');
					await playlistDeletePair({ playlistId: playlist.assetId, pairId: pairData.id });
				}
			});
		}
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
						assetId: assetId,
						asset: asset
					})
			}
		];
		
		// Add inline browse pairing option for maps and modes only
		if ((assetKind === 2 || assetKind === 6) && asset) {
			const inlineBrowseModalVar = inlineBrowsePairingModalVar || get(inlineBrowsePairingModal);
			authGroups.push({
				type: DropdownType.Button,
				icon: Plus,
				text: `Create Map-Mode Pair`,
				function: () => {
					inlineBrowseModalVar?.open(asset);
				}
			});
		}

		if (playlist && currentUser && playlist.userId == currentUser.id) {
			authGroups.push({
				type: DropdownType.Button,
				icon: Delete,
				text: `Remove From Playlist`,
				function: () => playlistDeleteAsset({ playlistId: playlist.assetId, assetId: assetId })
			});
		}
	}
	let noAuthGroups = [];
	
	if (pairedAsset) {
		// For paired assets, modify the copy link section
		noAuthGroups = [
			{
				type: DropdownType.Button,
				icon: Duplicate,
				text: `Copy Map Link`,
				function: () => getAssetLink({ assetId: assetId, assetKind: assetKind })
			},
			{
				type: DropdownType.Button,
				icon: Duplicate,
				text: `Copy Gamemode Link`,
				function: () => getAssetLink({ assetId: pairedAsset.assetId, assetKind: pairedAsset.assetKind })
			}
		];
		
		if (assetKind !== 5) {
			noAuthGroups.push({
				type: DropdownType.Button,
				icon: Duplicate,
				text: `Copy Waypoint Link`,
				function: () => getAssetLink({ assetId: assetId, assetKind: assetKind, isWaypoint: true })
			});
		}
	} else {
		// Standard copy links for non-paired assets
		noAuthGroups = [
			{
				type: DropdownType.Button,
				icon: Duplicate,
				text: `Copy ${assetKind === 2 ? 'Map' : assetKind === 6 ? 'Mode' : assetKind === 4 ? 'Prefab' : 'Playlist'} Link`,
				function: () => getAssetLink({ assetId: assetId, assetKind: assetKind })
			}
		];
		
		if (assetKind !== 5) {
			noAuthGroups.push({
				type: DropdownType.Button,
				icon: Duplicate,
				text: `Copy Waypoint Link`,
				function: () => getAssetLink({ assetId: assetId, assetKind: assetKind, isWaypoint: true })
			});
		}
	}

	// Prepare result arrays
	let result = [];
	
	// For paired assets, add a "Go to Gamemode" option at the top for mobile users
	// who might have trouble clicking the small gamemode chip
	if (pairedAsset && currentUser) {
		const viewGamemodeGroup = [
			{
				type: DropdownType.A,
				icon: Link,
				text: `Go to Gamemode`,
				href: `/modes/${pairedAsset.assetId}`
			}
		];
		result = [viewGamemodeGroup, authGroups, noAuthGroups];
	} else if (currentUser) {
		result = [authGroups, noAuthGroups];
	} else {
		result = [noAuthGroups];
	}
	
	// Cache the result before returning
	groupsCache.set(cacheKey, result);
	return result;
}
export function removeSameValues<T extends object>(details: T, ogDetails: T): Partial<T> {
	return Object.entries(details).reduce((acc, [key, value]) => {
		if (key.toLowerCase().includes('id') || value !== ogDetails[key as keyof T]) {
			acc[key as keyof T] = value;
		}
		return acc;
	}, {} as Partial<T>);
}

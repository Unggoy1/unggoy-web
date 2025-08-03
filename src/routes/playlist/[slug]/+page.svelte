<script lang="ts">
	import type { PageData } from './$types';
	import { DropdownType } from '$lib/enums';
	import { playlistDelete, playlistDeleteAsset, playlistUpdate } from '$lib/api/playlist';
	import { Delete, Edit, Private, Public, Plus } from '$lib/components/icons';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import PairedAssetsContainer from '$lib/components/PairedAssetsContainer.svelte';
	import { playlistModal, addToPlaylistModal } from '../../../stores/modal';
	import { favoritesAdd, favoritesDelete } from '$lib/api/favorites';
	import { user } from '../../../stores/user';
	import { onMount } from 'svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const currentUser = $derived($user);
	const addToPlaylistModalVar = $derived($addToPlaylistModal);

	// Check if playlist is empty (no pairs and no regular assets)
	const isEmptyPlaylist = $derived(!data.pairs?.length && !data.assets?.length);
	const isOwner = $derived(currentUser && data.playlist.userId === currentUser.id);

	function openAddToPlaylistModal() {
		if (addToPlaylistModalVar?.open) {
			addToPlaylistModalVar.open(data.playlist);
		}
	}

	onMount(() => {});
</script>

<svelte:head>
	<title>{data.playlist.name}</title>
	<meta name="description" content={data.playlist.description} />
	<meta property="og:title" content={data.playlist.name} /><meta
		name="twitter:card"
		content="summary_large_image"
	/><meta name="twitter:title" content={data.playlist.name} /><meta
		name="twitter:description"
		content={data.playlist.description}
	/><meta property="og:image" content={data.playlist.thumbnailUrl} /><meta
		property="og:image:alt"
		content={'Thumbnail:' + data.playlist.name}
	/><meta name="twitter:img:src" content={data.playlist.thumbnailUrl} />
</svelte:head>

<div class="main-container">
	<div class="playlist-header">
		<div class="playlist-content">
			<div class="playlist-thumbnail">
				<img
					src={data.playlist.thumbnailUrl || '/placeholder.webp'}
					alt="thumbnail"
				/>
			</div>
			<div class="playlist-info">
				<div class="playlist-title">
					{#if isOwner}
						{#if data.playlist.private === true}
							<Private active={false}></Private>
						{:else}
							<Public active={false}></Public>
						{/if}
					{/if}
					<span class="title-text">{data.playlist.name}</span>
				</div>
				<div class="playlist-description">
					{data.playlist.description}
				</div>
				<div class="playlist-meta">
					<div class="creator-info">
						<img class="creator-avatar" src={data.playlist.user.emblemPath} alt="profile emblem" />
						<a href="/browse?gamertag={data.playlist.user.username}" class="creator-name">
							{data.playlist.user.username}
						</a>
					</div>
					<div class="playlist-stats">
						<span>{data.playlist._count.favoritedBy} favorites</span>
						<span>•</span>
						<span>{data.playlist._count.ugcPairs} assets</span>
					</div>
				</div>
			</div>
		</div>
		
		{#if $user}
			<div class="playlist-actions">
				{#if $user.id === data.playlist.userId}
					<!-- Owner actions - Add Assets is always visible -->
					<button 
						class="action-button primary-action" 
						onclick={openAddToPlaylistModal}
						aria-label="Add assets to playlist"
					>
						<Plus active={false}></Plus>
						<span class="action-text">Add Assets</span>
					</button>
					
					<!-- More actions dropdown for owner -->
					<Dropdown
						groups={[
							[
								{
									type: DropdownType.Button,
									icon: Edit,
									text: 'Edit Details',
									function: () =>
										$playlistModal.edit({
											playlistId: data.playlist.assetId,
											name: data.playlist.name,
											description: data.playlist.description
										})
								},
								{
									type: DropdownType.Button,
									icon: data.playlist.private === true ? Public : Private,
									text: data.playlist.private === true ? 'Make Public' : 'Make Private',
									function: () =>
										playlistUpdate({
											playlistId: data.playlist.assetId,
											isPrivate: !data.playlist.private
										})
								},
								{
									type: DropdownType.Button,
									icon: Delete,
									text: `Delete Playlist`,
									function: () => playlistDelete({ playlistId: data.playlist.assetId })
								}
							]
						]}
					>
						<button class="action-button secondary-action" aria-label="More options">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
							</svg>
						</button>
					</Dropdown>
				{/if}
				
				<!-- Favorite button for all logged in users -->
				<button
					class="action-button favorite-action"
					class:favorited={data.playlist.favoritedBy && data.playlist.favoritedBy.length !== 0}
					onclick={async () =>
						!data.playlist.favoritedBy || data.playlist.favoritedBy.length === 0
							? favoritesAdd(data.playlist)
							: favoritesDelete(data.playlist)}
					aria-label={!data.playlist.favoritedBy || data.playlist.favoritedBy.length === 0
						? 'favorite playlist'
						: 'unfavorite playlist'}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
					</svg>
				</button>
			</div>
		{/if}
	</div>

	<!-- Empty Playlist Call-to-Action -->
	{#if isEmptyPlaylist && isOwner}
		<div class="empty-playlist-cta">
			<div class="empty-playlist-content">
				<img src="/superintendent_sad.webp" alt="Empty Playlist" class="empty-icon" />
				<h3>Your playlist is empty</h3>
				<p>Start building your collection by adding your favorite maps, modes, and prefabs.</p>
				<button onclick={openAddToPlaylistModal} class="sidebar-link-button">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z" fill="currentColor"/>
					</svg>
					<span>Add Assets</span>
				</button>
			</div>
		</div>
	{:else}
		<PairedAssetsContainer 
			browseData={data} 
			pairs={data.pairs}
			pairsTotalPages={data.pairsTotalPages}
			pairsTotalResults={data.pairsTotalResults}
		></PairedAssetsContainer>
	{/if}
</div>

<style>
	.empty-playlist-cta {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 400px;
		padding: 2rem;
	}

	.empty-playlist-content {
		text-align: center;
		max-width: 500px;
	}

	.empty-icon {
		width: 120px;
		height: 120px;
		margin-bottom: 1.5rem;
		opacity: 0.8;
	}

	.empty-playlist-content h3 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.empty-playlist-content p {
		color: var(--text-secondary);
		margin-bottom: 2rem;
		line-height: 1.5;
	}

	.sidebar-link-button {
		/* Shape and structure like sidebar-link */
		display: flex;
		align-items: center;
		text-decoration: none;
		line-height: 20px;
		height: 56px;
		border-radius: 12px;
		padding-left: 16px;
		padding-right: 16px;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		
		/* Colors and hover effects like .favorite button */
		background-color: var(--button-bg);
		color: var(--button-color);
		
		/* Positioning for the empty state */
		margin: 1rem auto 0;
		float: none;
		width: auto;
		min-width: 140px;
	}

	.sidebar-link-button:hover {
		background-color: var(--button-bg-hover);
		color: var(--button-color-hover);
		font-weight: 700;
	}

	.sidebar-link-button svg {
		width: 24px;
		height: 24px;
		margin-right: 16px;
		fill: var(--button-color);
		flex-shrink: 0;
	}

	.sidebar-link-button:hover svg {
		fill: var(--button-color-hover);
	}

	.sidebar-link-button span {
		font-family: var(--body-font);
		font-size: 16px;
		font-weight: 500;
	}

	/* New Playlist Header Styles */
	.playlist-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 24px;
		gap: 24px;
		background: var(--container-bg);
		border-radius: 12px;
		margin-bottom: 24px;
	}

	.playlist-content {
		display: flex;
		gap: 20px;
		flex: 1;
		min-width: 0; /* Allow text truncation */
	}

	.playlist-thumbnail {
		flex-shrink: 0;
	}

	.playlist-thumbnail img {
		width: 200px;
		height: 112px;
		object-fit: cover;
		border-radius: 12px;
	}

	.playlist-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.playlist-header .playlist-title {
		display: flex !important;
		align-items: center;
		gap: 12px;
		font-size: 2rem !important;
		font-weight: 700;
		color: var(--container-color);
		line-height: 1.1 !important;
		margin-bottom: 4px;
		padding-bottom: 0 !important;
	}

	.playlist-header .playlist-title :global(svg) {
		width: 24px !important;
		height: 24px !important;
		fill: var(--container-color);
		flex-shrink: 0;
	}

	.title-text {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.playlist-header .playlist-description {
		font-size: 1rem !important;
		color: var(--sidebar-color);
		line-height: 1.4 !important;
		margin: 0 !important;
		padding: 0 !important;
		font-style: normal;
		font-weight: 400;
		display: block !important;
		-webkit-box-orient: initial !important;
		-webkit-line-clamp: initial !important;
		overflow: visible !important;
	}

	.playlist-header .playlist-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 8px;
	}

	.playlist-header .creator-info {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 2px;
	}

	.creator-avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		object-fit: cover;
	}

	.creator-name {
		color: var(--button-color);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.creator-name:hover {
		color: var(--button-color-hover);
		text-decoration: underline;
	}

	.playlist-stats {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.875rem;
		color: var(--sidebar-color);
	}

	.playlist-actions {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		flex-shrink: 0;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		font-weight: 500;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.primary-action {
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	.primary-action:hover {
		background-color: var(--button-bg-hover);
		color: var(--button-color-hover);
	}

	.primary-action :global(svg) {
		width: 18px;
		height: 18px;
		fill: currentColor;
	}

	.secondary-action {
		background-color: var(--top-container-bg);
		color: var(--container-color);
		padding: 10px;
	}

	.secondary-action:hover {
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	.favorite-action {
		background-color: var(--top-container-bg);
		color: var(--sidebar-color);
		padding: 10px;
	}

	.favorite-action:hover {
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	.favorite-action.favorited {
		background-color: #dfb759;
		color: #fff;
	}

	.favorite-action.favorited:hover {
		background-color: #c9a54a;
	}

	.action-text {
		font-size: 0.875rem;
	}

	/* Mobile Responsiveness */
	@media screen and (max-width: 768px) {
		.playlist-header {
			flex-direction: column;
			align-items: stretch;
			padding: 16px;
			gap: 16px;
		}

		.playlist-content {
			flex-direction: column;
			gap: 16px;
		}

		.playlist-thumbnail {
			align-self: center;
		}

		.playlist-thumbnail img {
			width: 280px;
			height: 157px;
		}

		.playlist-title {
			font-size: 1.5rem;
			text-align: center;
			justify-content: center;
		}

		.playlist-description {
			text-align: center;
		}

		.playlist-meta {
			align-items: center;
		}

		.playlist-actions {
			justify-content: center;
			flex-wrap: wrap;
		}

		.action-button {
			flex: 1;
			justify-content: center;
			min-width: 120px;
		}
	}

	@media screen and (max-width: 480px) {
		.playlist-thumbnail img {
			width: 240px;
			height: 135px;
		}

		.playlist-title {
			font-size: 1.25rem;
		}

		.action-text {
			display: none;
		}

		.action-button {
			min-width: auto;
			padding: 12px;
		}

		.primary-action {
			padding: 10px 16px;
		}

		.primary-action .action-text {
			display: inline;
		}
	}
</style>

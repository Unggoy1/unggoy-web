<script lang="ts">
	import type { PageData } from './$types';
	import { DropdownType } from '$lib/enums';
	import { playlistDelete, playlistDeleteAsset, playlistUpdate } from '$lib/api/playlist';
	import { Delete, Edit, Private, Public } from '$lib/components/icons';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import PairedAssetsContainer from '$lib/components/PairedAssetsContainer.svelte';
	import { playlistModal } from '../../../stores/modal';
	import { favoritesAdd, favoritesDelete } from '$lib/api/favorites';
	import { user } from '../../../stores/user';
	import { onMount } from 'svelte';

	export let data: PageData;

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
	<div class="playlist-container">
		<div class="playlist-metadata-wrapper">
			<div class="playlist-image-wrapper">
				<img
					class="playlist-image"
					src={data.playlist.thumbnailUrl || '/placeholder.webp'}
					alt="thumbnail"
				/>
			</div>
			<div>
				<div class="playlist-title">
					{#if data.playlist.private === true}
						<Private active={false}></Private>
					{:else}
						<Public active={false}></Public>
					{/if}
					{data.playlist.name}
				</div>
				<div class="playlist-description">
					{data.playlist.description}
				</div>
				<div class="user-settings">
					<img class="user-img" src={data.playlist.user.emblemPath} alt="profile emblem" />
					<a href="/browse?gamertag={data.playlist.user.username}">
						<div class="playlist-author">
							{data.playlist.user.username}
						</div>
					</a>
					<div>
						&nbsp;&nbsp;•&nbsp;&nbsp;{data.playlist._count.favoritedBy} favorites&nbsp;&nbsp;•&nbsp;&nbsp;{data
							.playlist._count.ugcPairs} assets
					</div>
				</div>
			</div>
		</div>
		{#if $user}
			<div>
				{#if $user.id === data.playlist.userId}
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
						<button class="favorite more" aria-label="dropdown more menu">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="32"
								viewBox="0 0 35 32"
								fill="none"
							>
								<path
									d="M7.91838 13.3333C6.38967 13.3333 5.13892 14.5333 5.13892 16C5.13892 17.4666 6.38967 18.6666 7.91838 18.6666C9.44708 18.6666 10.6978 17.4666 10.6978 16C10.6978 14.5333 9.44708 13.3333 7.91838 13.3333ZM27.3746 13.3333C25.8459 13.3333 24.5951 14.5333 24.5951 16C24.5951 17.4666 25.8459 18.6666 27.3746 18.6666C28.9033 18.6666 30.1541 17.4666 30.1541 16C30.1541 14.5333 28.9033 13.3333 27.3746 13.3333ZM17.6465 13.3333C16.1178 13.3333 14.867 14.5333 14.867 16C14.867 17.4666 16.1178 18.6666 17.6465 18.6666C19.1752 18.6666 20.426 17.4666 20.426 16C20.426 14.5333 19.1752 13.3333 17.6465 13.3333Z"
									fill="#CEE7EE"
								/>
							</svg>
						</button>
					</Dropdown>
				{/if}
				<button
					class="favorite"
					class:favorited={data.playlist.favoritedBy && data.playlist.favoritedBy.length !== 0}
					onclick={async () =>
						!data.playlist.favoritedBy || data.playlist.favoritedBy.length === 0
							? favoritesAdd(data.playlist)
							: favoritesDelete(data.playlist)}
					aria-label={!data.playlist.favoritedBy || data.playlist.favoritedBy.length === 0
						? 'favorite button'
						: 'unfavorite button'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="34"
						height="32"
						viewBox="0 0 34 32"
						fill="#cee7ee"
					>
						<path
							d="M16.9243 23.0266L22.6917 26.3733C23.7479 26.9866 25.0404 26.08 24.7624 24.9333L23.2337 18.64L28.334 14.4C29.2651 13.6266 28.7648 12.16 27.5419 12.0666L20.8295 11.52L18.2029 5.57331C17.7304 4.49331 16.1183 4.49331 15.6458 5.57331L13.0192 11.5066L6.30679 12.0533C5.08383 12.1466 4.58353 13.6133 5.51465 14.3866L10.615 18.6266L9.08626 24.92C8.80831 26.0666 10.1008 26.9733 11.157 26.36L16.9243 23.0266Z"
						/>
					</svg>
				</button>
			</div>
		{/if}
	</div>

	<PairedAssetsContainer 
		browseData={data} 
		pairs={data.pairs}
		pairsTotalPages={data.pairsTotalPages}
		pairsTotalResults={data.pairsTotalResults}
	></PairedAssetsContainer>
</div>

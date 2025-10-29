<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import '../assets/css/dialog.css';
	import '../assets/css/app.css';
	import '../assets/css/styles.css';
	import '../assets/css/animations.css';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { dev, version } from '$app/environment';
	import type { LayoutData } from './$types';
	import { user } from '../stores/user';
	import { playlistStore } from '../stores/playlist';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { DropdownType } from '$lib/enums';
	import toast, { Toaster } from 'svelte-french-toast';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';
	import InlineBrowsePairingModal from '$lib/components/InlineBrowsePairingModal.svelte';
	import AddToPlaylistModal from '$lib/components/AddToPlaylistModal.svelte';
	import { addAssetModal, playlistModal, inlineBrowsePairingModal, addToPlaylistModal } from '../stores/modal';
	import {
		Compass,
		Anvil,
		Gamepad,
		ChevronDown,
		Star,
		LogOut,
		Play,
		Map,
		Home,
		Plus,
		Xbox,
		Recommended,
		Github,
		Discord,
		Gear,
		News
	} from '$lib/components/icons';
	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	export let data: LayoutData;
	let dropdown: Dropdown;

	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3200/';
	let groups;

	let isSidebarCollapsed = false;
	let searchTerm = '';
	let isDrawerOpen = false;
	let drawerRef;
	let addAssetModalComponent: AddAssetModal;
	let playlistModalComponent: PlaylistModal;
	let inlineBrowsePairingModalComponent: InlineBrowsePairingModal;
	let addToPlaylistModalComponent: AddToPlaylistModal;

	$: currentAssetKind = new URLSearchParams($page.url.search).get('assetKind');

	const handleResize = () => {
		isSidebarCollapsed = window.innerWidth <= 1250;
	};

	const updateUrl = (event) => {
		if (event.key !== 'Enter') {
			return;
		}

		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('searchTerm', searchTerm);
		query.delete('page'); // Reset to first page when searching
		goto(`/browse?${query.toString()}`);
	};

	function toggleDrawer(event) {
		event.stopPropagation();
		isDrawerOpen = !isDrawerOpen;
	}
	function closeDrawer() {
		isDrawerOpen = false;
	}

	function handleClickOutside(event) {
		if (drawerRef && !drawerRef.contains(event.target)) {
			closeDrawer();
		}
	}
	onMount(() => {
		data?.user ? user.set(data.user) : user.set(undefined);
		if (data.user) {
			playlistStore.set(data.user.Playlist);
		}
		//Add resize event listener on component mount
		window.addEventListener('resize', handleResize);
		window.addEventListener('click', handleClickOutside);
		handleResize();
		// Initialize modals
		if (addAssetModalComponent) {
			$addAssetModal = addAssetModalComponent;
		}
		if (playlistModalComponent) {
			$playlistModal = playlistModalComponent;
		}
		if (inlineBrowsePairingModalComponent) {
			$inlineBrowsePairingModal = inlineBrowsePairingModalComponent;
		}
		if (addToPlaylistModalComponent) {
			$addToPlaylistModal = addToPlaylistModalComponent;
		}

		groups = [
			[
				{
					type: DropdownType.Button,
					icon: Plus,
					text: `Create New Playlist`,
					function: () => $playlistModal.create({})
				},
				{ type: DropdownType.A, icon: Play, text: `My Playlists`, href: '/playlist/me' },
				{ type: DropdownType.A, icon: Star, text: `Favorites`, href: '/playlist/favorites' },
				{ type: DropdownType.A, icon: Gear, text: `Account Settings`, href: '/account' },
				{
					type: DropdownType.A,
					icon: LogOut,
					text: `Log Out`,
					href: `${endpoint}logout?redirectUrl=${escape($page.url.href)}`
				}
			]
		];

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', handleClickOutside);
		};
	});

	//possible todo extract sidebar links into an object and use a loop to creaet them..
	const sidebarLinks = [
		{ text: 'Home', url: '/', icon: '' },
		{ text: 'About', url: '/about', icon: '' }
		// Add more links as needed
	];
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>
<AddAssetModal bind:this={addAssetModalComponent} />
<PlaylistModal bind:this={playlistModalComponent} />
<InlineBrowsePairingModal bind:this={inlineBrowsePairingModalComponent} />
<AddToPlaylistModal bind:this={addToPlaylistModalComponent} />
<Toaster></Toaster>
<div class="unggoy-container">
	<div class="sidebar" class:collapse={isSidebarCollapsed}>
		<span class="logo">S</span>
		<a class="logo-expand" href="/">Unggoy</a>
		<div class="side-wrapper">
			<div class="side-menu">
				<a
					data-sveltekit-replacestate
					class="sidebar-link discover"
					class:is-active={$page.url.pathname === '/'}
					href="/"
				>
					<Home active={false}></Home>
					<p>Home</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link trending"
					class:is-active={$page.url.pathname === '/browse' && currentAssetKind === 'Map'}
					href="/browse?assetKind=Map"
				>
					<Map active={false}></Map>
					<p>Maps</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link"
					class:is-active={$page.url.pathname === '/browse' &&
						currentAssetKind === 'UgcGameVariant'}
					href="/browse?assetKind=UgcGameVariant"
				>
					<Gamepad active={false}></Gamepad>
					<p>Gamemodes</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link"
					class:is-active={$page.url.pathname === '/browse' && currentAssetKind === 'Prefab'}
					href="/browse?assetKind=Prefab"
				>
					<Anvil active={false}></Anvil>
					<p>Prefabs</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link"
					class:is-active={$page.url.pathname === '/browse/playlist'}
					href="/browse/playlist"
				>
					<Play active={false}></Play>
					<p>Playlists</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link"
					class:is-active={$page.url.pathname === '/browse' && currentAssetKind === null}
					href="/browse"
				>
					<Compass active={false}></Compass>
					<p>Browse</p>
				</a>
				<a
					data-sveltekit-replacestate
					class="sidebar-link"
					class:is-active={$page.url.pathname === '/recommended'}
					href="/recommended"
				>
					<Recommended active={false}></Recommended>
					<p>343 Featured</p>
				</a>
			</div>
		</div>
		<!-- Footer Section -->
		<div class="sidebar-footer">
			<!-- Line 2: Social Icons -->
			<div class="footer-socials">
				<a href="https://discord.gg/xnwFA4z2HA" target="_blank">
					<Discord class="social-icon"></Discord>
				</a>
				<a href="https://github.com/Unggoy1" target="_blank">
					<Github class="social-icon"></Github>
				</a>
				<a href="/blog">
					<News class="social-icon"></News>
				</a>
				<!-- Add more social icons as needed -->
			</div>

			<!-- Line 1: Text Links -->
			<div class="footer-links">
				<a href="https://github.com/Unggoy1" target="_blank" class="footer-link">v{version}</a>
				<a href="/legal/privacy" class="footer-link">Privacy</a>
				<a href="/legal/terms" class="footer-link">Terms</a>
			</div>
		</div>
		<!-- <div class="side-wrapper"> -->
		<!-- 	<div class="side-title">YOUR PLAYLISTS</div> -->
		<!-- 	<div class="side-menu"> -->
		<!-- 		<a class="sidebar-link" href="/"> -->
		<!-- 			<svg viewBox="0 0 24 24" fill="currentColor"> -->
		<!-- 				<path -->
		<!-- 					fill-rule="evenodd" -->
		<!-- 					clip-rule="evenodd" -->
		<!-- 					d="M15.164 6.083l.948.011c3.405 0 5.888 2.428 5.888 5.78v4.307c0 3.353-2.483 5.78-5.888 5.78A193.5 193.5 0 0112.01 22c-1.374 0-2.758-.01-4.122-.038-3.405 0-5.888-2.428-5.888-5.78v-4.307c0-3.353 2.483-5.78 5.898-5.78 1.286-.02 2.6-.04 3.935-.04v-.163c0-.665-.56-1.204-1.226-1.204h-.972c-1.109 0-2.012-.886-2.012-1.965 0-.395.334-.723.736-.723.412 0 .736.328.736.723 0 .289.246.52.54.52h.972c1.481.01 2.688 1.194 2.698 2.64v.183c.619 0 1.238.008 1.859.017zm-4.312 8.663h-1.03v1.02a.735.735 0 01-.737.723.728.728 0 01-.736-.722v-1.021H7.31a.728.728 0 01-.736-.723c0-.395.334-.722.736-.722h1.04v-1.012c0-.395.324-.723.736-.723.403 0 .736.328.736.723v1.012h1.03c.403 0 .737.327.737.722a.728.728 0 01-.736.723zm4.17-1.629h.099a.728.728 0 00.736-.722.735.735 0 00-.736-.723h-.098a.722.722 0 100 1.445zm1.679 3.315h.098a.728.728 0 00.736-.723.735.735 0 00-.736-.723H16.7a.722.722 0 100 1.445z" -->
		<!-- 				/> -->
		<!-- 			</svg> -->
		<!-- 			Live Stream -->
		<!-- 		</a> -->
		<!-- 		<a cla${endpoint}logout?redirectUrl=${escape($page.url.href)}ss="sidebar-link" href="/"> -->
		<!-- 			<svg viewBox="0 0 24 24" fill="currentColor"> -->
		<!-- 				<path -->
		<!-- 					fill-rule="evenodd" -->
		<!-- 					clip-rule="evenodd" -->
		<!-- 					d="M7.33 2h9.34c3.4 0 5.32 1.93 5.33 5.33v9.34c0 3.4-1.93 5.33-5.33 5.33H7.33C3.93 22 2 20.07 2 16.67V7.33C2 3.93 3.93 2 7.33 2zm4.72 15.86c.43 0 .79-.32.83-.75V6.92a.815.815 0 00-.38-.79.84.84 0 00-1.28.79v10.19c.05.43.41.75.83.75zm4.6 0c.42 0 .78-.32.83-.75v-3.28a.839.839 0 00-1.28-.79.806.806 0 00-.38.79v3.28c.04.43.4.75.83.75zm-8.43-.75a.827.827 0 01-.83.75c-.43 0-.79-.32-.83-.75V10.2a.84.84 0 01.39-.79c.27-.17.61-.17.88 0s.42.48.39.79v6.91z" -->
		<!-- 				/> -->
		<!-- 			</svg> -->
		<!-- 			Tutorial -->
		<!-- 		</a> -->
		<!-- 		<a class="sidebar-link" href="/"> -->
		<!-- 			<svg viewBox="0 0 24 24" fill="currentColor"> -->
		<!-- 				<path -->
		<!-- 					fill-rule="evenodd" -->
		<!-- 					clip-rule="evenodd" -->
		<!-- 					d="M19.761 12.001c0 .814.668 1.475 1.489 1.475.414 0 .75.333.75.743v2.677C22 19.159 20.142 21 17.858 21H6.143C3.859 21 2 19.159 2 16.896v-2.677c0-.41.336-.743.75-.743.822 0 1.49-.662 1.49-1.475 0-.793-.641-1.39-1.49-1.39a.752.752 0 01-.53-.217.74.74 0 01-.22-.525l.002-2.764C2.002 4.842 3.86 3 6.144 3h11.712c2.284 0 4.143 1.842 4.143 4.105L22 9.782a.741.741 0 01-.219.526.753.753 0 01-.531.218c-.821 0-1.489.662-1.489 1.475zm-5.509.647l1.179-1.137a.73.73 0 00-.409-1.25l-1.629-.236-.729-1.462a.737.737 0 00-.662-.41H12a.74.74 0 00-.663.409l-.729 1.463-1.626.235a.735.735 0 00-.6.498.724.724 0 00.187.753l1.179 1.137-.278 1.608a.727.727 0 00.295.719.742.742 0 00.777.054L12 14.27l1.455.757a.733.733 0 00.78-.053.723.723 0 00.296-.718l-.279-1.608z" -->
		<!-- 				/> -->
		<!-- 			</svg> -->
		<!-- 			Competation -->
		<!-- 		</a> -->
		<!-- 		<a class="sidebar-link" href="/"> -->
		<!-- 			<svg viewBox="0 0 24 24" fill="currentColor"> -->
		<!-- 				<path -->
		<!-- 					fill-rule="evenodd" -->
		<!-- 					clip-rule="evenodd" -->
		<!-- 					d="M16.158 8.233a4.207 4.207 0 01-4.209 4.234 4.207 4.207 0 01-4.21-4.234A4.206 4.206 0 0111.95 4a4.206 4.206 0 014.21 4.233zM11.95 20c-3.431 0-6.36-.544-6.36-2.72 0-2.177 2.91-2.74 6.36-2.74 3.431 0 6.361.544 6.361 2.72S15.399 20 11.949 20zm6.008-11.69a5.765 5.765 0 01-.984 3.24.158.158 0 00.107.245 3.4 3.4 0 00.483.046c1.643.044 3.118-1.02 3.525-2.621.604-2.379-1.168-4.514-3.425-4.514-.245 0-.48.026-.708.073-.031.007-.064.021-.082.05-.022.034-.006.08.016.11a5.807 5.807 0 011.068 3.37zm2.721 5.203c1.104.217 1.83.66 2.131 1.304a1.923 1.923 0 010 1.67c-.46.998-1.944 1.319-2.52 1.402-.12.018-.215-.086-.203-.206.295-2.767-2.048-4.08-2.654-4.381-.026-.014-.032-.034-.03-.047.003-.009.013-.023.033-.026 1.312-.024 2.722.156 3.243.284zM6.438 11.84c.164-.004.325-.019.483-.046a.158.158 0 00.106-.245 5.765 5.765 0 01-.984-3.24c0-1.25.39-2.416 1.068-3.372.022-.03.037-.075.016-.11-.017-.027-.051-.042-.082-.05a3.52 3.52 0 00-.71-.072c-2.255 0-4.027 2.135-3.423 4.514.407 1.6 1.882 2.664 3.525 2.621zm.159 1.414c.003.013-.003.033-.028.047-.607.302-2.95 1.614-2.656 4.38.013.121-.082.224-.201.207-.577-.083-2.06-.404-2.52-1.402a1.917 1.917 0 010-1.67c.3-.644 1.026-1.087 2.13-1.305.522-.127 1.93-.307 3.244-.283.02.003.03.017.03.026z" -->
		<!-- 				/> -->
		<!-- 			</svg> -->
		<!-- 			Community -->
		<!-- 		</a> -->
		<!-- 	</div> -->
		<!-- </div> -->
	</div>
	<div class="header-wrapper">
		<div class="header">
			<div class="search-bar">
				<input bind:value={searchTerm} onkeydown={updateUrl} type="text" placeholder="Search" />
			</div>
			{#if $user}
				<!-- <div class="user-settings"> -->
				<!-- 	<img class="user-img" src="/emblems/popculture_dealerschoice_bigfoot_emblem.png" alt="" /> -->
				<!-- 	<div class="user-name">{$user.username}</div> -->
				<!-- 	<ChevronDown></ChevronDown> -->
				<!-- </div> -->
				<Dropdown bind:this={dropdown} {groups}>
					<div class="user-settings">
						<img class="user-img" src={$user.emblemPath} alt="" />
						<div class="user-name">{$user.username}</div>
						<ChevronDown></ChevronDown>
					</div>
				</Dropdown>
			{:else}
				<div class="user-settings">
					<a
						data-sveltekit-replacestate
						class="user-signin"
						href={endpoint + 'login/azure?redirectUrl=' + escape($page.url.href)}
					>
						<!-- <svg xmlns="http://www.w3.org/2000/svg" class="xbox-signin" viewBox="0 0 512 512" -->
						<!-- 	><path -->
						<!-- 		fill="currentColor" -->
						<!-- 		d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7 .1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z" -->
						<!-- 	/></svg -->
						<!-- > -->
						<p class="xbox-signin-text">Login via Xbox</p>
					</a>
				</div>
			{/if}
		</div>
		<slot />
	</div>
	<div class="bottom-nav">
		<a href="/" class="bottom-nav-link" class:is-active={$page.url.pathname === '/'}>
			<Home active={false}></Home>
			<span>Home</span>
		</a>
		<a href="/browse" class="bottom-nav-link" class:is-active={$page.url.pathname === '/browse'}>
			<Compass active={false}></Compass>
			<span>Browse</span>
		</a>
		<a
			href="/browse/playlist"
			class="bottom-nav-link"
			class:is-active={$page.url.pathname === '/browse/playlist' && currentAssetKind === null}
		>
			<Play active={false}></Play>
			<span>Playlists</span>
		</a>
		<a
			href="/recommended"
			class="bottom-nav-link"
			class:is-active={$page.url.pathname === '/recommended'}
		>
			<Recommended active={false}></Recommended>
			<span>Featured</span>
		</a>
		{#if $user}
			<button onclick={toggleDrawer} class="bottom-nav-link">
				<img alt="emblem name here" src={$user.emblemPath} />
				<span>Profile</span>
			</button>
		{:else}
			<a
				href={endpoint + 'login/azure?redirectUrl=' + escape($page.url.href)}
				class="bottom-nav-link"
				class:is-active={$page.url.pathname === '/browse/playlist' && currentAssetKind === null}
			>
				<Xbox active={false}></Xbox>
				<span>Login</span>
			</a>
		{/if}
	</div>
	{#if $user}
		<div bind:this={drawerRef} class="slideup-drawer" class:open={isDrawerOpen}>
			<div class="drawer-header">
				<div class="drawer-header-text">
					<img class="contributor-img" alt="emblem name here" src={$user.emblemPath} />
					<a href="/browse?gamertag={$user.username}">
						<div class="contributor-name">{$user.username}</div>
						<div class="contributor-tag">{$user.serviceTag}</div>
					</a>
				</div>
			</div>
			<div class="drawer-options">
				<button
					onclick={() => {
						closeDrawer();
						$playlistModal.create({});
					}}
					class="drawer-option"
				>
					<Plus active={false}></Plus>
					<span>Create Playlist</span>
				</button>
				<a href="/playlist/me" class="drawer-option">
					<Play active={false}></Play>
					<span>My Playlists</span>
				</a>
				<a href="/playlist/favorites" class="drawer-option">
					<Star active={false}></Star>
					<span>Favorites</span>
				</a>
				<a href="${endpoint}logout?redirectUrl=${escape($page.url.href)}" class="drawer-option">
					<LogOut active={false}></LogOut>
					<span>Logout</span>
				</a>
			</div>
		</div>
	{/if}
</div>

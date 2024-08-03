<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import '../assets/css/dialog.css';
	import '../assets/css/styles.css';
	import '../assets/css/app.css';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { dev } from '$app/environment';
	import type { LayoutData } from './$types';
	import { user } from '../stores/user';
	import ChevronDown from '../components/ChevronDown.svelte';
	import Play from '../components/Play.svelte';
	import Star from '../components/Star.svelte';
	import LogOut from '../components/LogOut.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { DropdownType } from '$lib/enums';
	import BetaLogin from '$lib/components/BetaLogin.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import AddAssetModal from '$lib/components/AddAssetModal.svelte';
	import PlaylistModal from '$lib/components/PlaylistModal.svelte';
	import { addAssetModal, playlistModal } from '../stores/modal';

	export let data: LayoutData;
	data?.user ? user.set(data.user) : user.set(undefined);
	let dropdown: Dropdown;

	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3200/';
	function test() {
		console.log('lololol');
	}
	const groups = [
		[
			{ type: DropdownType.Button, icon: Play, text: `Create New Playlist`, function: test },
			{ type: DropdownType.A, icon: Play, text: `My Playlists`, href: '' },
			{ type: DropdownType.A, icon: Star, text: `Liked Playlists`, href: '' },
			{
				type: DropdownType.A,
				icon: LogOut,
				text: `Log Out`,
				href: `${endpoint}logout?redirectUrl=${escape($page.url.href)}`
			}
		]
	];

	let isSidebarCollapsed = false;
	let activeLink = null;
	let searchTerm = '';

	const handleClick = (event) => {
		const clickedLink = event.currentTarget;

		if (activeLink) {
			activeLink.classList.remove('is-active');
		}

		clickedLink.classList.add('is-active');
		activeLink = clickedLink;
	};

	const updateActiveLink = () => {
		// Remove active class from the previously active link
		if (activeLink) {
			activeLink.classList.remove('is-active');
		}

		// Find the link corresponding to the current route and add the active class
		const currentPath = $page.route.id;
		const currentQuery = location.search;
		const currentLink = document.querySelector(`[href="${currentPath}${currentQuery}"]`);

		if (currentLink) {
			currentLink.classList.add('is-active');
			activeLink = currentLink;
		}
	};

	const handleResize = () => {
		isSidebarCollapsed = window.innerWidth <= 1090;
	};

	const updateUrl = (event) => {
		if (event.key !== 'Enter') {
			return;
		}

		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('searchTerm', searchTerm);
		goto(`/browse?${query.toString()}`);
	};

	onMount(() => {
		if (data.error) {
			toast.error("Xbox user doesn't have Beta access");
		}
		//Add resize event listener on component mount
		window.addEventListener('resize', handleResize);
		handleResize();
		// updateActiveLink();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	const sidebarLinks = [
		{ text: 'Home', url: '/', icon: '' },
		{ text: 'About', url: '/about', icon: '' }
		// Add more links as needed
	];

	// $: console.log('activLink:', activeLink);
</script>

<AddAssetModal bind:this={$addAssetModal}></AddAssetModal>
<PlaylistModal bind:this={$playlistModal}></PlaylistModal>
<Toaster></Toaster>
{#if !$user && !dev}
	<BetaLogin url={endpoint + 'login/azure?redirectUrl=' + escape($page.url.href)}></BetaLogin>
{:else}
	<div class="container">
		<div class="sidebar" class:collapse={isSidebarCollapsed}>
			<span class="logo">S</span>
			<a class="logo-expand" href="/">Unggoy</a>
			<div class="side-wrapper">
				<div class="side-menu">
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link discover"
						class:is-active={activeLink === null}
						href="/"
					>
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
							/>
						</svg>
						Featured
					</a>
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link trending"
						class:is-active={activeLink === null}
						href="/browse?assetKind=Map"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"
							/></svg
						>
						Maps
					</a>
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link"
						class:is-active={activeLink === null}
						href="/browse?assetKind=UgcGameVariant"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"
							/></svg
						>
						Gamemodes
					</a>
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link"
						class:is-active={activeLink === null}
						href="/browse?assetKind=Prefab"
					>
						<svg
							width="33"
							height="33"
							viewBox="0 0 33 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><g clip-path="url(#a)"
								><path
									d="M21.173 26.992c-.44-.88-1.65-2.6-4.37-2.6-2.86 0-4.11 1.72-4.55 2.6h-3.93v-3.18c.88-.16 3.51-1.56 4.62-2.53l.25-.22v-1c0-1.61-1.12-2.96-2.49-3.01h-.04c-7.23-.49-8.56-5.41-8.74-6.33h8.85v-1.73h21.15v2.4c-4.28.02-6.93 1.95-8.29 3.25-1.68 1.61-3.05 4.6-3.05 6.36v.19l.31.21c1.07.74 3.45 2.16 4.2 2.35v3.23h-3.93z"
									fill="#fff"
								/></g
							><defs><clipPath id="a"><path fill="#fff" d="M.923.992h32v32h-32z" /></clipPath></defs
							></svg
						> Prefabs
					</a>
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link"
						class:is-active={activeLink === null}
						href="/browse/playlist"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
							/></svg
						>
						Playlists
					</a>
					<a
						data-sveltekit-replacestate
						on:click={handleClick}
						class="sidebar-link"
						class:is-active={activeLink === null}
						href="/browse"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
							/></svg
						>
						Browse
					</a>
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
			<!-- 		<a class="sidebar-link" href="/"> -->
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
					<input bind:value={searchTerm} on:keydown={updateUrl} type="text" placeholder="Search" />
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
							class:is-active={$activeLink === null}
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
	</div>
{/if}

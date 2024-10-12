// stores/playlistStore.js
import { writable } from 'svelte/store';

function createPlaylistStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		set,
		update,
		add: (playlist) => update((playlists) => [...playlists, playlist]),
		remove: (assetId) => update((playlists) => playlists.filter((p) => p.assetId !== assetId)),
		updatePlaylist: (assetId, updatedData) =>
			update((playlists) =>
				playlists.map((p) => (p.assetId === assetId ? { ...p, ...updatedData } : p))
			),
		refresh: async () => {
			const response = await fetch('/api/playlists');
			const playlists = await response.json();
			set(playlists);
		}
	};
}

export const playlistStore = createPlaylistStore();

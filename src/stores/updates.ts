import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface UpdateTracker {
	lastSeenVersion: string;
	isFirstVisit: boolean;
}

const UPDATE_STORAGE_KEY = 'unggoy_update_tracker';

function createUpdateStore() {
	const { subscribe, set, update } = writable<boolean>(false);

	return {
		subscribe,

		// Initialize update tracking and check if user should see notification
		init: (currentVersion: string) => {
			if (!browser) return;

			try {
				const stored = localStorage.getItem(UPDATE_STORAGE_KEY);

				if (!stored) {
					// First visit - store current version, no notification
					const tracker: UpdateTracker = {
						lastSeenVersion: currentVersion,
						isFirstVisit: true
					};
					localStorage.setItem(UPDATE_STORAGE_KEY, JSON.stringify(tracker));
					set(false);
					return;
				}

				const tracker: UpdateTracker = JSON.parse(stored);

				// Compare versions - show notification if current version is newer
				const shouldShowNotification = isNewerVersion(currentVersion, tracker.lastSeenVersion) && !tracker.isFirstVisit;

				set(shouldShowNotification);
			} catch (error) {
				console.warn('Failed to initialize update tracker:', error);
				set(false);
			}
		},

		// Mark updates as seen (called when user visits /blog)
		markAsSeen: (currentVersion: string) => {
			if (!browser) return;

			try {
				const tracker: UpdateTracker = {
					lastSeenVersion: currentVersion,
					isFirstVisit: false
				};
				localStorage.setItem(UPDATE_STORAGE_KEY, JSON.stringify(tracker));
				set(false);
			} catch (error) {
				console.warn('Failed to mark updates as seen:', error);
			}
		}
	};
}

// Simple version comparison for semantic versioning (e.g., "0.9.5" vs "0.9.6")
function isNewerVersion(current: string, last: string): boolean {
	try {
		const currentParts = current.split('.').map(Number);
		const lastParts = last.split('.').map(Number);

		// Pad arrays to same length
		const maxLength = Math.max(currentParts.length, lastParts.length);
		while (currentParts.length < maxLength) currentParts.push(0);
		while (lastParts.length < maxLength) lastParts.push(0);

		// Compare each part
		for (let i = 0; i < maxLength; i++) {
			if (currentParts[i] > lastParts[i]) return true;
			if (currentParts[i] < lastParts[i]) return false;
		}

		return false; // Versions are equal
	} catch (error) {
		console.warn('Failed to compare versions:', error);
		return false;
	}
}

export const updateNotification = createUpdateStore();
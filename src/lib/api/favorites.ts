import { invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { request, type RequestOpts } from './base';

export async function favoritesAdd({ assetId }): Promise<void> {
	const context: RequestOpts = {
		path: '/favorites/' + assetId,
		method: 'POST'
	};

	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Added to your favorites`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

export async function favoritesDelete({ assetId }): Promise<void> {
	const context: RequestOpts = {
		path: '/favorites/' + assetId,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(request(context), {
			loading: 'Removing...',
			success: (data) => `Removed from your favorites`,
			error: (err: Error) => err.message
		});

		invalidateAll();
	} catch (error) {}
}

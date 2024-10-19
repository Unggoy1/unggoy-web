import toast from 'svelte-french-toast';
import { request, type Fetch, type RequestOpts } from './base';
import { goto, invalidateAll } from '$app/navigation';
import { user } from '../../stores/user';

export async function userGet({ svelteFetch }: Fetch) {
	const context: RequestOpts = {
		path: `/user`,
		method: 'GET'
	};
	try {
		const result = await request(context, svelteFetch);
		if (!result.ok) {
			console.log(result.text);
			return undefined;
		}
		return await result.json();
	} catch (error) {
		throw error;
	}
}

export async function userDelete() {
	const context: RequestOpts = {
		path: `/user`,
		method: 'DELETE'
	};
	try {
		const result = await toast.promise(
			request(context).then(async (response) => {
				if (!response.ok) {
					throw new Error('Failed to delete account');
				}
				return response;
			}),
			{
				loading: 'Deleting...',
				success: () => `Successfully deleted account`,
				error: (err: any) => err.body?.message || 'Error deleting account'
			}
		);

		user.set(undefined);
		await goto('/');
		await invalidateAll();
	} catch (error) {
		console.error('Error deleting account:', error);
	}
}

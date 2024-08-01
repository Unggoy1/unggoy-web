import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: LayoutLoad = async ({ fetch, url }) => {
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3200/';

	const error = url.searchParams.get('error');
	if (error) {
		console.log('we had an error');
		return {
			error: error
		};
	}

	const response = await fetch(endpoint + 'user', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) {
		return {
			user: undefined
		};
	}

	const user = await response.json();
	return {
		user: user
	};
};

import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: LayoutLoad = async ({ fetch }) => {
	const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3200/';

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
	console.log('ioearsn');
	console.log(user);
	return {
		user: user
	};
};

import type { LayoutLoad } from './$types';
import { userGet } from '$lib/api/user';

export const load: LayoutLoad = async ({ fetch, url }) => {
	try {
		const user = await userGet({ svelteFetch: fetch });
		return {
			user: user
		};
	} catch (error) {
		return {
			user: undefined
		};
	}
};

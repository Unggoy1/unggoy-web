import type { PageLoad } from './$types';
import { searchAll } from '$lib/api/search';

export const ssr = true;

// How many items each section shows before "See all".
const SECTION_COUNT = 8;

export const load: PageLoad = async ({ fetch, url }) => {
	const q = (url.searchParams.get('q') ?? '').trim();

	// No query → render the empty prompt without hitting the API.
	if (!q) {
		return {
			q,
			creators: [],
			maps: [],
			modes: [],
			prefabs: [],
			playlists: [],
			counts: { creators: 0, maps: 0, modes: 0, prefabs: 0, playlists: 0 }
		};
	}

	// One unified call. A failure (e.g. the endpoint not deployed yet) degrades to
	// empty sections instead of taking the whole page down.
	const res = await searchAll({ svelteFetch: fetch, searchTerm: q, count: SECTION_COUNT }).catch(
		() => null
	);

	return {
		q,
		creators: res?.creators?.items ?? [],
		maps: res?.maps?.items ?? [],
		modes: res?.modes?.items ?? [],
		prefabs: res?.prefabs?.items ?? [],
		playlists: res?.playlists?.items ?? [],
		counts: {
			creators: res?.creators?.totalCount ?? 0,
			maps: res?.maps?.totalCount ?? 0,
			modes: res?.modes?.totalCount ?? 0,
			prefabs: res?.prefabs?.totalCount ?? 0,
			playlists: res?.playlists?.totalCount ?? 0
		}
	};
};

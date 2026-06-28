import { request, type Fetch, type RequestOpts } from './base';
import type { UgcData } from './ugc';
import type { PlaylistData } from './playlist';
import type { CreatorSummary } from './creator';

/** One result group: the top `items` plus the full match count for "See all". */
export interface SearchSection<T> {
	items: T[];
	totalCount: number;
}

/** Response from the unified GET /search endpoint. */
export interface SearchAllResponse {
	searchTerm: string;
	creators: SearchSection<CreatorSummary>;
	maps: SearchSection<UgcData>;
	modes: SearchSection<UgcData>;
	prefabs: SearchSection<UgcData>;
	playlists: SearchSection<PlaylistData>;
}

export interface SearchAll extends Fetch {
	searchTerm: string;
	/** Max items per section (backend caps at 30). */
	count?: number;
}

/**
 * Unified site search across maps, modes, prefabs, playlists, and creators in a
 * single round-trip. Backs both the /search results page and the header
 * typeahead. Throws on non-2xx — callers degrade gracefully.
 */
export async function searchAll({
	searchTerm,
	count,
	svelteFetch
}: SearchAll): Promise<SearchAllResponse> {
	const context: RequestOpts = {
		path: `/search`,
		method: 'GET',
		query: {
			searchTerm,
			count
		}
	};
	const result = await request(context, svelteFetch);
	return result.json();
}

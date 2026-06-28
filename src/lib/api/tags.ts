import { request, type Fetch, type RequestOpts } from './base';

/** A tag suggestion from the autocomplete endpoint. */
export interface TagSuggestion {
	tag: string;
	count: number;
}

export interface TagSearchResponse {
	tags: TagSuggestion[];
}

export interface TagSearch extends Fetch {
	/** Partial tag text. Empty → most popular tags. */
	searchTerm?: string;
	count?: number;
}

/**
 * Autocomplete tags from the backend tags table, ranked by usage. Powers the
 * multi-tag filter input. Throws on non-2xx — callers degrade to freeform entry.
 */
export async function tagSearch({
	searchTerm,
	count,
	svelteFetch
}: TagSearch): Promise<TagSearchResponse> {
	const context: RequestOpts = {
		path: `/tags/search`,
		method: 'GET',
		query: {
			searchTerm,
			count
		}
	};
	const result = await request(context, svelteFetch);
	return result.json();
}

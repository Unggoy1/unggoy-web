import { request, type Fetch, type RequestOpts } from './base';

export interface CreatorStats {
	ownedMaps: number;
	ownedModes: number;
	ownedPrefabs: number;
	playlists: number;
	// Optional: counts of assets the creator contributed to but doesn't own.
	// When present, the tabs show these in Contributor mode.
	contributedMaps?: number;
	contributedModes?: number;
	contributedPrefabs?: number;
	totalPlays: number;
	totalBookmarks: number;
	averageRating: number;
	ratedAssetCount: number;
	firstPublishedAt?: string | null;
	lastPublishedAt?: string | null;
}

export interface CreatorProfile {
	gamertag: string;
	serviceTag?: string;
	emblemPath?: string;
	xuid?: string;
	/** Optional: most-played owned map thumbnail, used for the hero backdrop. */
	featuredThumbnailUrl?: string | null;
	stats: CreatorStats;
}

export interface CreatorGet extends Fetch {
	gamertag: string;
}

/**
 * Fetch a creator's identity + owned-content stats. Throws on non-2xx (caller
 * decides whether to 404 or degrade gracefully).
 */
export async function creatorGet({ gamertag, svelteFetch }: CreatorGet): Promise<CreatorProfile> {
	const context: RequestOpts = {
		path: `/creator/${encodeURIComponent(gamertag)}`,
		method: 'GET'
	};
	const result = await request(context, svelteFetch);
	return result.json();
}

/**
 * Lightweight creator hit returned by the unified search endpoint (GET /search,
 * see `src/lib/api/search.ts`) — enough to render a result card.
 */
export interface CreatorSummary {
	gamertag: string;
	serviceTag?: string;
	emblemPath?: string;
	xuid?: string;
	ownedMaps?: number;
	ownedModes?: number;
	ownedPrefabs?: number;
	playlists?: number;
	totalPlays?: number;
}

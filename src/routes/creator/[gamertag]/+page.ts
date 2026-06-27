import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { ugcBrowse } from '$lib/api/ugc';
import { playlistBrowse } from '$lib/api/playlist';
import { creatorGet, type CreatorProfile } from '$lib/api/creator';
import { resolvePageSize } from '$lib/api';

export const ssr = true;

const TABS = ['maps', 'modes', 'prefabs', 'playlists'] as const;
type Tab = (typeof TABS)[number];

const ASSET_KIND: Record<Exclude<Tab, 'playlists'>, number> = {
	maps: 2,
	modes: 6,
	prefabs: 4
};

const FEATURED_COUNT = 8;

function paginate(data: { assets: any[]; totalCount: number; pageSize: number }, page: number) {
	return {
		assets: data.assets ?? [],
		totalResults: data.totalCount ?? 0,
		totalPages: Math.max(1, Math.ceil((data.totalCount ?? 0) / (data.pageSize || 1))),
		currentPage: page
	};
}

export const load: PageLoad = async ({ fetch, url, params }) => {
	const gamertag = params.gamertag;

	const tab: Tab = (TABS as readonly string[]).includes(url.searchParams.get('tab') ?? '')
		? (url.searchParams.get('tab') as Tab)
		: 'maps';
	// "Contributor" only applies to UGC tabs; playlists are always the user's own.
	const role = url.searchParams.get('role') === 'contributor' ? 'contributor' : 'owner';

	const selectedPageSize = resolvePageSize(url.searchParams.get('count'));
	const page = parseInt(url.searchParams.get('page') ?? '') || 1;
	const offset = (page - 1) * selectedPageSize;

	const isPlaylists = tab === 'playlists';
	const sort = url.searchParams.get('sort') ?? (isPlaylists ? 'updatedAt' : 'publishedAt');
	const order = url.searchParams.get('order') ?? 'desc';

	// Build the active tab's content request.
	const contentRequest = isPlaylists
		? playlistBrowse({ svelteFetch: fetch, gamertag, sort, order, offset, count: selectedPageSize })
		: ugcBrowse({
				svelteFetch: fetch,
				gamertag,
				assetKind: ASSET_KIND[tab],
				ownerOnly: role === 'owner',
				contributorOnly: role === 'contributor',
				sort,
				order,
				offset,
				count: selectedPageSize
			});

	const [profile, featuredRes, contentRes] = await Promise.all([
		// Profile is optional: if the endpoint isn't deployed yet we degrade.
		creatorGet({ gamertag, svelteFetch: fetch }).catch(() => null as CreatorProfile | null),
		// Most-played owned content (any kind) → hero backdrop + "Most Played" strip.
		ugcBrowse({
			svelteFetch: fetch,
			gamertag,
			ownerOnly: true,
			sort: 'playsAllTime',
			order: 'desc',
			count: FEATURED_COUNT
		}).catch(() => ({ assets: [], totalCount: 0, pageSize: FEATURED_COUNT })),
		contentRequest.catch(() => ({ assets: [], totalCount: 0, pageSize: selectedPageSize }))
	]);

	const featured = featuredRes.assets ?? [];
	const content = paginate(contentRes, page);

	// If the profile endpoint is missing, recover identity from the content we do
	// have so the page still renders.
	let creator: CreatorProfile | null = profile;
	if (!creator) {
		const sample =
			featured.find((a: any) => a.contributors?.length) ??
			content.assets.find((a: any) => a?.contributors?.length || a?.user);
		const contributor = sample?.contributors?.find(
			(c: any) => c.gamertag?.toLowerCase() === gamertag.toLowerCase()
		);
		creator = {
			gamertag,
			serviceTag: contributor?.serviceTag ?? sample?.user?.serviceTag,
			emblemPath: contributor?.emblemPath ?? sample?.user?.emblemPath,
			xuid: contributor?.xuid,
			stats: null as any
		};
	}

	const exists = !!profile || featured.length > 0 || content.totalResults > 0;
	if (!exists) {
		throw error(404, `No creator found for "${gamertag}".`);
	}

	const backdropUrl =
		profile?.featuredThumbnailUrl ??
		featured[0]?.thumbnailUrl ??
		content.assets[0]?.thumbnailUrl ??
		null;

	return {
		gamertag,
		creator,
		hasStats: !!profile?.stats,
		featured,
		backdropUrl,
		activeTab: tab,
		activeRole: role,
		content: {
			...content,
			selectedPageSize,
			sort,
			order
		}
	};
};

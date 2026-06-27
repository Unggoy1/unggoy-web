import type { RequestHandler } from './$types';
import { SITE_BASE } from '$lib/seo';
import { ugcBrowse } from '$lib/api/ugc';
import { playlistBrowse } from '$lib/api/playlist';

// Generated on request so newly published content shows up without a rebuild.
export const prerender = false;

// The backend caps `count` at 30 (it 422s on anything larger), so we page
// through results at that size and stop after a bounded number of pages to
// keep the most-recent content in the sitemap without hammering the API.
const PAGE_SIZE = 30;
const MAX_PAGES_PER_KIND = 10; // up to 300 most-recent items per content type

const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
	{ path: '/', priority: '1.0', changefreq: 'daily' },
	{ path: '/browse', priority: '0.9', changefreq: 'daily' },
	{ path: '/browse?assetKind=Map', priority: '0.9', changefreq: 'daily' },
	{ path: '/browse?assetKind=UgcGameVariant', priority: '0.9', changefreq: 'daily' },
	{ path: '/browse?assetKind=Prefab', priority: '0.8', changefreq: 'daily' },
	{ path: '/browse/playlist', priority: '0.8', changefreq: 'daily' },
	{ path: '/recommended', priority: '0.7', changefreq: 'weekly' },
	{ path: '/blog', priority: '0.5', changefreq: 'weekly' },
	{ path: '/legal/privacy', priority: '0.2', changefreq: 'yearly' },
	{ path: '/legal/terms', priority: '0.2', changefreq: 'yearly' }
];

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function toIso(value: unknown): string | undefined {
	if (!value) return undefined;
	const date = new Date(value as string);
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function urlEntry({
	loc,
	lastmod,
	changefreq,
	priority
}: {
	loc: string;
	lastmod?: string;
	changefreq?: string;
	priority?: string;
}): string {
	return [
		'  <url>',
		`    <loc>${escapeXml(loc)}</loc>`,
		lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
		changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
		priority ? `    <priority>${priority}</priority>` : '',
		'  </url>'
	]
		.filter(Boolean)
		.join('\n');
}

/**
 * Page through a browse endpoint at the backend's max page size, collecting the
 * most-recent items. Stops on a short page, when totalCount is reached, on the
 * page cap, or if a request fails — a backend hiccup never breaks the sitemap.
 */
async function collect(
	browse: (opts: {
		count: number;
		offset: number;
	}) => Promise<{ assets?: any[]; totalCount?: number }>
): Promise<any[]> {
	const all: any[] = [];
	for (let pageIndex = 0; pageIndex < MAX_PAGES_PER_KIND; pageIndex++) {
		let res;
		try {
			res = await browse({ count: PAGE_SIZE, offset: pageIndex * PAGE_SIZE });
		} catch {
			break;
		}
		const assets = Array.isArray(res?.assets) ? res.assets : [];
		all.push(...assets);
		const total = typeof res?.totalCount === 'number' ? res.totalCount : all.length;
		if (assets.length < PAGE_SIZE || all.length >= total) break;
	}
	return all;
}

export const GET: RequestHandler = async ({ fetch }) => {
	const [maps, modes, prefabs, playlists] = await Promise.all([
		collect(({ count, offset }) =>
			ugcBrowse({
				svelteFetch: fetch,
				assetKind: 2,
				count,
				offset,
				sort: 'publishedAt',
				order: 'desc'
			})
		),
		collect(({ count, offset }) =>
			ugcBrowse({
				svelteFetch: fetch,
				assetKind: 6,
				count,
				offset,
				sort: 'publishedAt',
				order: 'desc'
			})
		),
		collect(({ count, offset }) =>
			ugcBrowse({
				svelteFetch: fetch,
				assetKind: 4,
				count,
				offset,
				sort: 'publishedAt',
				order: 'desc'
			})
		),
		collect(({ count, offset }) =>
			playlistBrowse({ svelteFetch: fetch, count, offset, sort: 'updatedAt', order: 'desc' })
		)
	]);

	const entries: string[] = [];

	for (const route of STATIC_ROUTES) {
		entries.push(
			urlEntry({
				loc: `${SITE_BASE}${route.path}`,
				changefreq: route.changefreq,
				priority: route.priority
			})
		);
	}

	const pushUgc = (asset: any, segment: string) => {
		if (!asset?.assetId) return;
		entries.push(
			urlEntry({
				loc: `${SITE_BASE}/${segment}/${asset.assetId}`,
				lastmod: toIso(asset.publishedAt),
				changefreq: 'weekly',
				priority: '0.6'
			})
		);
	};

	maps.forEach((a) => pushUgc(a, 'maps'));
	modes.forEach((a) => pushUgc(a, 'modes'));
	prefabs.forEach((a) => pushUgc(a, 'prefabs'));

	for (const playlist of playlists) {
		if (!playlist?.assetId) continue;
		entries.push(
			urlEntry({
				loc: `${SITE_BASE}/playlist/${playlist.assetId}`,
				lastmod: toIso(playlist.updatedAt),
				changefreq: 'weekly',
				priority: '0.5'
			})
		);
	}

	// Creator profiles: dedupe authors from the assets we already fetched.
	const creators = new Set<string>();
	for (const asset of [...maps, ...modes, ...prefabs]) {
		const author = asset?.contributors?.find((c: any) => c.xuid === asset.authorId);
		const gamertag = author?.gamertag ?? asset?.contributors?.[0]?.gamertag;
		if (gamertag) creators.add(gamertag);
	}
	for (const gamertag of creators) {
		entries.push(
			urlEntry({
				loc: `${SITE_BASE}/creator/${encodeURIComponent(gamertag)}`,
				changefreq: 'weekly',
				priority: '0.5'
			})
		);
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			// Cache at the edge for an hour; browsers always revalidate.
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};

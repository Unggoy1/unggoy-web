import { PUBLIC_URL } from '$env/static/public';

/**
 * Shared SEO constants and helpers used by the <Seo> component, the sitemap,
 * and robots.txt so every part of the site agrees on the canonical origin.
 */

export const SITE_NAME = 'Unggoy';

// Canonical origin, without a trailing slash. Driven by PUBLIC_URL so dev and
// production both produce correct absolute URLs.
export const SITE_BASE = (PUBLIC_URL || 'http://localhost:5173').replace(/\/+$/, '');

export const DEFAULT_OG_IMAGE = `${SITE_BASE}/pwa-512x512.png`;

export const DEFAULT_DESCRIPTION =
	'Browse and discover Halo Infinite community maps, modes, and prefabs, or build and share custom playlists on Unggoy.';

/** Turn a path (or already-absolute URL) into an absolute URL on this site. */
export function absoluteUrl(path: string): string {
	if (!path) return SITE_BASE;
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Serialize JSON-LD, escaping `<` so it can't break out of the script tag. */
export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

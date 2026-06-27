// Playlist cover logic. The backend serves a single cover image as `thumbnailUrl`
// — either a user upload or a server-generated composite of the playlist's maps.
// The frontend shows that image when present, and otherwise renders a stable,
// name-derived tint over the placeholder.

// Slightly muted so the tint reads as "themed", not neon.
export const COVER_PALETTE = [
	'#1f9e93',
	'#3f74c4',
	'#7163d6',
	'#cc6336',
	'#6f9a2c',
	'#c25680',
	'#c79030',
	'#cf4f4f',
	'#2f93a8',
	'#9166cf'
];

export const COVER_CONFIG = {
	placeholderSrc: '/placeholder.webp',
	// 'soft-light' is calmer; 'overlay' has more pop. One-line A/B.
	tintBlendMode: 'soft-light' as 'soft-light' | 'overlay',
	// 0..1 — lower is a subtler tint. A full-strength hue-replacing blend looks
	// too vibrant, so this stays well under 1.
	tintStrength: 0.65
};

export function hashString(s: string): number {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
	return Math.abs(h);
}

export function coverColor(name: string): string {
	return COVER_PALETTE[hashString(name) % COVER_PALETTE.length];
}

// The backend returns the placeholder path as a sentinel `thumbnailUrl` when a
// playlist has no cover image, so a non-empty value is not enough — exclude the
// placeholder (by path or any host + path).
export function hasCoverImage(url?: string | null): url is string {
	return !!url && url !== COVER_CONFIG.placeholderSrc && !url.endsWith('/placeholder.webp');
}

export type CoverPlan = { kind: 'image'; src: string } | { kind: 'tint'; color: string };

export function planCover(p: { name: string; thumbnailUrl?: string | null }): CoverPlan {
	if (hasCoverImage(p.thumbnailUrl)) return { kind: 'image', src: p.thumbnailUrl };
	return { kind: 'tint', color: coverColor(p.name) };
}

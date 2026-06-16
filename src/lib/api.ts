import type { PlaylistData } from './api/playlist';
import type { UgcData } from './api/ugc';

/** Page-size options offered by the results-per-page selector. */
export const PAGE_SIZE_OPTIONS = [10, 20, 30];
/** Default page size when none is set (or an invalid one is supplied). */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Coerce a raw page-size value (URL param string, stored number, etc.) into one
 * of the allowed PAGE_SIZE_OPTIONS, falling back to DEFAULT_PAGE_SIZE.
 */
export function resolvePageSize(value: number | string | null | undefined): number {
	const parsed = typeof value === 'number' ? value : parseInt(value ?? '', 10);
	return PAGE_SIZE_OPTIONS.includes(parsed) ? parsed : DEFAULT_PAGE_SIZE;
}

export interface BrowseData {
	playlist?: PlaylistData;
	assets: UgcData[] | PlaylistData[];
	totalPages: number;
	pageSize: number;
	selectedPageSize?: number;
	totalResults: number;
	currentPage: number;
	sort: string;
	order: string;
	filter?: string;
	gamertag: string;
	ownerOnly?: boolean;
	hide343Assets?: boolean;
	tag?: string;
}

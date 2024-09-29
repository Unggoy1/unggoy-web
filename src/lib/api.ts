import type { PlaylistData } from './api/playlist';
import type { UgcData } from './api/ugc';

export interface BrowseData {
	playlist?: PlaylistData;
	assets: UgcData[] | PlaylistData[];
	totalPages: number;
	pageSize: number;
	totalResults: number;
	currentPage: number;
	sort: string;
	order: string;
	filter?: string;
	gamertag: string;
	ownerOnly?: boolean;
	tag?: string;
}

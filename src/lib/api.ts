import { PUBLIC_API_URL } from '$env/static/public';
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
	tag?: string;
}
export interface UgcFetchData {
	assetKind?: number; //'Map' | ''UgcGameVariant'' | 'Prefab';
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	offset?: number; //number
	count?: number;
	tags?: string[];
	gamertag?: string;
	ownerOnly?: boolean;
	searchTerm?: string;
}

export interface UgcBrowseResponse {
	assets: UgcData[];
	totalCount: number;
	pageSize: number;
}

export interface PlaylistFetchData {
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	offset?: number; //number
	count?: number;
	searchTerm?: string;
}

export interface PlaylistBrowseResponse {
	assets: PlaylistData[];
	totalCount: number;
	pageSize: number;
}

export interface PlaylistData {
	assetId: string;
	name: string;
	description: string;
	assetKind: number;
	thumbnailUrl: string;
	private: boolean;
	userId: string;
	featured?: boolean;
}

export interface Contributor {
	xuid: string;
	gamertag: string;
	serviceTag: string;
}

export interface UgcData {
	assetId: string;
	version: number;
	name: string;
	description: string;
	assetKind: number;
	thumbnailUrl: string;
	favorites: number;
	likes: number;
	bookmarks: number;
	playsRecent: number;
	playsAllTime: number;
	averageRating: number;
	numberOfRatings: number;
	publishedAt: Date;
	hasNodeGraph: boolean;
	readOnlyClones: boolean;
	numberOfObjects: number;
	contributors: Contributor[];
	authorId: string; //xuid(12345612645614)
	tags?: string[];
	featured?: boolean;
}

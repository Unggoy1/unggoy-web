import { request, type Fetch, type RequestOpts } from './base';

export async function ugcBrowse({
	assetKind,
	sort,
	order,
	offset,
	count,
	gamertag,
	ownerOnly,
	tags,
	searchTerm,
	svelteFetch
}: UgcBrowse) {
	const context: RequestOpts = {
		path: `/ugc/browse`,
		method: 'GET',
		query: {
			assetKind,
			sort,
			order,
			offset,
			count,
			gamertag,
			ownerOnly,
			tags,
			searchTerm
		}
	};
	try {
		const result = await request(context, svelteFetch);
		return result.json();
	} catch (error) {
		//throw some error here about not being able to decode the data
	}
}
export async function ugcGet({ assetId, svelteFetch }: UgcGet): Promise<UgcData> {
	const context: RequestOpts = {
		path: `/ugc/asset/${assetId}`,
		method: 'GET'
	};
	try {
		const result = await request(context, svelteFetch);
		return result.json();
	} catch (error) {
		//throw some error here about not being able to decode the data
	}
}
export interface UgcBrowse extends Fetch {
	assetKind?: number; // number 'Map' | ''UgcGameVariant'' | 'Prefab';
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	offset?: number; //number
	count?: number; //number
	tags?: string;
	gamertag?: string;
	ownerOnly?: boolean; // "boolean"
	searchTerm?: string;
}

export interface UgcBrowseResponse {
	assets: UgcData[];
	totalCount: number;
	pageSize: number;
}

export interface UgcGet extends Fetch {
	assetId: string;
}

export interface Contributor {
	xuid: string;
	gamertag: string;
	serviceTag: string;
	emblemPath: string;
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
	files: UgcFiles;
	recommended: boolean;
}
export interface UgcFiles {
	prefix: string; //url
	fileRelativePaths: string[];
}
export interface UgcData {
	assetId: string;
	assetVersionId: string;
	name: string;
	description: string;
	assetKind: number; //replace with enumm for map, variant, prefab
	tags?: string[]; // list of tags, might replace with diff data type
	thumbnail: string;
	refrencedAssets?: string[]; //Seems unused but idk???
	originalAuthor: string; // of the form "xuid(123123123123)"
	likes: number;
	bookmarks: number;
	playsRecent: number;
	numberOfObjects: number;
	dateCreated: Date; //UTC ISO8601 date format
	dateModified: Date; //UTC ISO8601 date format
	datePublished: Date; //UTC ISO8601 date format
	hasNodeGraph: boolean;
	readOnlyClones: boolean;
	playsAllTime: number;
	contributors: string[]; // of the form "xuid()"
	parentAssetCount: number;
	averageRating: number; // float/double
	numberOfRatings: number;
	profilePicture: string;
}

export interface UgcFetchData {
	kind?: string; //'Map' | 'Mode' | 'Prefab';
	sortt?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	page?: string; //number
}

const endpoint = 'http://192.168.11.69:8080/api/';

export async function fetchUgc(params?: UgcFetchData): Promise<UgcData[]> {
	const ugcEndpoint = endpoint + 'ugc?';
	try {
		const response = await fetch(ugcEndpoint + new URLSearchParams({ ...params }));

		if (!response.ok) {
			throw new Error(`failed to fetch data. Status: ${response.status}`);
		}
		//pageProps.query
		//pageProps.results
		//pageProps.totalPages
		//pageProps.totalResults
		//pageProps.pageSize
		const data = await response.json();

		return data.ugcList as UgcData[];
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchMap(assetId: string) {
	const mapsEndpoint = endpoint + 'ugc/maps/' + assetId;
	try {
		const response = await fetch(mapsEndpoint);

		if (!response.ok) {
			throw new Error(`failed to fetch data. Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchMode(assetId: string) {
	const mapsEndpoint = endpoint + 'ugc/modes/' + assetId;
	try {
		const response = await fetch(mapsEndpoint);

		if (!response.ok) {
			throw new Error(`failed to fetch data. Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchPrefab(assetId: string) {
	const mapsEndpoint = endpoint + 'ugc/prefabs/' + assetId;
	try {
		const response = await fetch(mapsEndpoint);

		if (!response.ok) {
			throw new Error(`failed to fetch data. Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

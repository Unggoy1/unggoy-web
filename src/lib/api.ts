export interface UgcFetchData {
	assetKind?: string; //'Map' | 'Mode' | 'Prefab';
	sort?: string; //'datepublishedutc';
	order?: string; //'desc' | 'asc';
	page?: string; //number
}
export interface UgcData {
	AssetId: string;
	AssetVersionId: string;
	Name: string;
	Description: string;
	AssetKind: number; //replace with enumm for map, variant, prefab
	Tags?: string[]; // list of tags, might replace with diff data type
	ThumbnailUrl: string;
	RefrencedAssets?: string[]; //Seems unused but idk???
	OriginalAuthor: string; // of the form "xuid(123123123123)"
	Likes: number;
	Bookmarks: number;
	PlaysRecent: number;
	NumberOfObjects: number;
	DateCreatedUtc: {
		ISO8601Date: Date;
	};

	DateModifiedUtc: {
		ISO8601Date: Date;
	};
	DatePublishedUtc: {
		ISO8601Date: Date;
	};
	HasNodeGraph: boolean;
	ReadOnlyClones: boolean;
	PlaysAllTime: number;
	Contributors: string[]; // of the form "xuid()"
	ParentAssetCount: number;
	AverageRating: number; // float/double
	NumberOfRatings: number;
}

const endpoint = 'http://localhost:3000/';

export async function fetchUgc(params?: UgcFetchData): Promise<UgcData[]> {
	const ugcEndpoint = endpoint + 'browse?';
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

		return data.results as UgcData[];
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

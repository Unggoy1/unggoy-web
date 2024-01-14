import type { UgcBrowseResponse, UgcFetchData } from '$lib/api';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;
export const load: PageLoad = async ({ fetch }) => {
  const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';

  const fetchParams: UgcFetchData = {
    assetKind: 'Map'
  };

  const ugcEndpoint = endpoint + 'ugc/browse?';
  const response = await fetch(ugcEndpoint + new URLSearchParams(fetchParams));
  const newMaps: UgcBrowseResponse = await response.json();

  fetchParams.assetKind = 'UgcGameVariant';
  const newModeResponse = await fetch(ugcEndpoint + new URLSearchParams(fetchParams));
  const newModes: UgcBrowseResponse = await newModeResponse.json();

  fetchParams.sort = 'playsrecent';
  const trendingModeResponse = await fetch(ugcEndpoint + new URLSearchParams(fetchParams));
  const trendingModes: UgcBrowseResponse = await trendingModeResponse.json();

  fetchParams.assetKind = 'Map';
  const trendingMapResponse = await fetch(ugcEndpoint + new URLSearchParams(fetchParams));
  const trendingMaps: UgcBrowseResponse = await trendingMapResponse.json();

  return {
    newMaps: newMaps.results,
    trendingMaps: trendingMaps.results,
    newModes: newModes.results,
    trendingModes: trendingModes.results
  };
};

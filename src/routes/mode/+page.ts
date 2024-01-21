import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;
export const load: PageLoad = async ({ fetch, url }) => {
  const endpoint = `${PUBLIC_API_URL}/` || 'http://localhost:3000/';
  const assetId: string = url.searchParams.get('assetId');
  const mapsEndpoint = endpoint + 'ugc/modes/' + assetId;

  const response = await fetch(mapsEndpoint);
  const data = await response.json();
  data.Files.FileRelativePaths = data.Files.FileRelativePaths.filter(
    (file) => file.endsWith('.jpg') || file.endsWith('.png')
  );

  return {
    mode: data
  };
};

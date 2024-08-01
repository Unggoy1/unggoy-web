import { PUBLIC_API_URL } from '$env/static/public';
const apiEndpoint = `${PUBLIC_API_URL}` || 'http://localhost:3200';

export async function request(context: RequestOpts): Promise<Response> {
	const { url, body } = await createFetchUrl(context);

	const response = await fetch(url, {
		method: context.method,
		credentials: 'include',
		body: body,
		headers: {
			'Content-Type': 'application/json',
			...context.headers
		}
	});

	if (!response.ok) {
		//do error handling here
		throw new Error('temporary error message');
	}
	return response;
}

async function createFetchUrl(context: RequestOpts) {
	let url = apiEndpoint + context.path;
	if (context.query !== undefined && Object.keys(context.query).length !== 0) {
		// only add the querystring to the URL if there are query parameters.
		// this is done to avoid urls ending with a "?" character which buggy webservers
		// do not handle correctly sometimes.
		url += '?' + this.configuration.queryParamsStringify(context.query);
	}
	let body;
	if (context.body) {
		body = JSON.stringify(context.body);
	}
	return { url, body };
}

export type Json = any;
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type HTTPHeaders = { [key: string]: string };
export type HTTPQuery = {
	[key: string]:
		| string
		| number
		| null
		| boolean
		| Array<string | number | null | boolean>
		| Set<string | number | null | boolean>
		| HTTPQuery;
};

export interface RequestOpts {
	path: string;
	method: HTTPMethod;
	headers?: HTTPHeaders;
	query?: HTTPQuery;
	body?: Json;
}

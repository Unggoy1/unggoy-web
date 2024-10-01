import { PUBLIC_API_URL } from '$env/static/public';
const apiEndpoint = `${PUBLIC_API_URL}` || 'http://localhost:3200';

export async function request(context: RequestOpts, svelteFetch?: typeof fetch): Promise<Response> {
	const { url, body } = await createFetchUrl(context);
	const fetchFunction = svelteFetch ?? fetch;
	const isFormData = body instanceof FormData;
	const response = await fetchFunction(url, {
		method: context.method,
		credentials: 'include',
		body: body,
		headers: {
			// Only set Content-Type if it's not FormData
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...context.headers
		}
	});

	if (!response.ok) {
		//do error handling here
		console.log(await response.text());
		throw new Error('temporary error message');
	}
	console.log(response.status);
	return response;
}

async function createFetchUrl(context: RequestOpts) {
	let url = apiEndpoint + context.path;
	if (context.query !== undefined && Object.keys(context.query).length !== 0) {
		// only add the querystring to the URL if there are query parameters.
		// this is done to avoid urls ending with a "?" character which buggy webservers
		// do not handle correctly sometimes.
		url += '?' + queryParamsStringify(context.query);
	}
	let body;
	const isFormData = context.body instanceof FormData;
	if (context.body && !isFormData) {
		body = JSON.stringify(context.body);
	} else {
		body = context.body;
	}
	return { url, body };
}
export function queryParamsStringify(params: HTTPQuery, prefix: string = ''): string {
	return Object.keys(params)
		.filter((key) => params[key] !== undefined) // Exclude keys with undefined values
		.map((key) => querystringSingleKey(key, params[key], prefix))
		.filter((part) => part.length > 0)
		.join('&');
}

function querystringSingleKey(
	key: string,
	value:
		| string
		| number
		| null
		| undefined
		| boolean
		| Array<string | number | null | boolean>
		| Set<string | number | null | boolean>
		| HTTPQuery,
	keyPrefix: string = ''
): string {
	const fullKey = keyPrefix + (keyPrefix.length ? `[${key}]` : key);
	if (value instanceof Array) {
		const multiValue = value
			.map((singleValue) => encodeURIComponent(String(singleValue)))
			.join(`&${encodeURIComponent(fullKey)}=`);
		return `${encodeURIComponent(fullKey)}=${multiValue}`;
	}
	if (value instanceof Set) {
		const valueAsArray = Array.from(value);
		return querystringSingleKey(key, valueAsArray, keyPrefix);
	}
	if (value instanceof Date) {
		return `${encodeURIComponent(fullKey)}=${encodeURIComponent(value.toISOString())}`;
	}
	if (value instanceof Object) {
		return queryParamsStringify(value as HTTPQuery, fullKey);
	}
	return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
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
	body?: Json | FormData;
}

export interface Fetch {
	svelteFetch?: typeof fetch;
}

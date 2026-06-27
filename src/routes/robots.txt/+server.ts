import { SITE_BASE } from '$lib/seo';

// Static at build time — robots.txt never needs live data.
export const prerender = true;

export function GET() {
	const body = `User-agent: *
Allow: /
Disallow: /account
Disallow: /playlist/me
Disallow: /playlist/favorites

Sitemap: ${SITE_BASE}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}

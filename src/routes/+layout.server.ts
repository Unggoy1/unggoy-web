// import type { LayoutServerLoad } from './$types';
//
// export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
// 	const session = cookies.get('auth_session');
// 	console.log('I Hath run boyo');
// 	let authenticated = false;
// 	if (!session) {
// 		authenticated = false;
// 	} else {
// 		authenticated = true;
// 	}
// Check if the session cookie is expired
// const isExpired = isCookieExpired(session);
// if (isExpired) {
// 	authenticated = false;
// }

// 	return {
// 		authenticated: authenticated
// 	};
// };

// function isCookieExpired(cookieValue) {
// 	// Implement your logic to check the expiration date
// 	// For example:
// 	const expirationDate = new Date(cookieValue.expirationDate);
// 	return expirationDate < new Date();
// }

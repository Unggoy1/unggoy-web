/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 *
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/

export const siteTitle = 'Unggoy Update Blog';
export const siteDescription = 'A blog to keep up with changes happening to the Unggoy Site';
export const siteURL = 'unggoy.xyz';
export const siteLink = 'https://unggoy.xyz/blog';
export const siteAuthor = '- find and change this text in src/lib/config.js';

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 5;

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Blog',
		route: '/blog'
	}
];

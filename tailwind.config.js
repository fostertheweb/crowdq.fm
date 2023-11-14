/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		extend: {
			fontFamily: {
				straker: ['Straker'],
				'readex-pro': ['Readex Pro']
			}
		}
	},
	plugins: []
};

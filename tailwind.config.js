/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				straker: ['Straker'],
				general: ['General Sans']
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};

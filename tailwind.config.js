/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		extend: {
			theme: {
				jukebox: {
					50: '#f2fbf8',
					100: '#d4f3e9',
					200: '#a8e7d2',
					300: '#75d3b6',
					400: '#5dc1a6',
					500: '#2f9d81',
					600: '#237e69',
					700: '#206556',
					800: '#1d5246',
					900: '#1d443c',
					950: '#0b2823'
				},
				japonica: {
					50: '#fdf5f3',
					100: '#fbeae5',
					200: '#f8d9d0',
					300: '#f2bfaf',
					400: '#e89981',
					500: '#df866b',
					600: '#c75c3b',
					700: '#a74a2e',
					800: '#8a402a',
					900: '#733a29',
					950: '#3e1b11'
				}
			},
			fontFamily: {
				straker: ['Straker'],
				'readex-pro': ['Readex Pro']
			},
			transitionProperty: {
				height: 'height'
			}
		}
	},
	plugins: []
};

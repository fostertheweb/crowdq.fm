import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
	const session = cookies.get('cq-session');

	if (!session) {
		throw redirect(304, new URL('/auth/login', url.origin).toString());
	}

	const { access_token } = JSON.parse(session);

	function get(path: string) {
		const baseUrl = 'https://api.spotify.com/v1';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', `Bearer ${access_token}`);

		return fetch(baseUrl + path, {
			headers
		}).then((response) => response.json());
	}

	const profile = await get('/me');

	console.log(profile);

	return profile;
}

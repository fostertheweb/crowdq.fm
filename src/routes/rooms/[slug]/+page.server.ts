import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET as clientSecret } from '$env/static/private';

const endpoint = 'https://accounts.spotify.com/api/token';

export async function load({ cookies }) {
	const authStringBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
	const body = new URLSearchParams();
	body.append('grant_type', 'client_credentials');

	const result = await fetch(endpoint, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authStringBase64}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});
	const credentials = await result.json();

	return {
		client: credentials,
		user: JSON.parse(cookies.get('cq-session'))
	};
}

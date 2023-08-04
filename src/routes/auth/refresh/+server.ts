import { json } from '@sveltejs/kit';

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env;
const url = 'https://accounts.spotify.com/api/token';

async function refresh(refresh_token: string) {
	const authStringBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
	const body = new URLSearchParams();
	body.append('grant_type', 'refresh_token');
	body.append('refresh_token', refresh_token);

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authStringBase64}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	return await response.json();
}

export async function POST({ request }) {
	const { refresh_token } = await request.json();
	const { access_token, expires_in } = await refresh(refresh_token);

	const credentials = {
		access_token,
		refresh_token,
		expires_at: expires_in * 1000 + Date.now()
	};

	const cookie = `cq-spotify-refresh=${refresh_token};Path=/;HttpOnly=true;SameSite=Lax;`;

	return json(credentials, {
		headers: {
			'Set-Cookie': cookie
		}
	});
}

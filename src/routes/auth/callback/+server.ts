import { redirect } from '@sveltejs/kit';

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env;

const url = 'https://accounts.spotify.com/api/token';

export async function GET({ request }) {
	const authStringBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const redirect_uri = `${request.referrer}/auth/spotify/callback`;

	if (!code) {
		return Response.redirect(new URL('/auth/login', request.referrer));
	}

	const body = new URLSearchParams();
	body.append('grant_type', 'authorization_code');
	body.append('code', code);
	body.append('redirect_uri', redirect_uri);

	const result = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authStringBase64}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	const { access_token, refresh_token } = await result.json();
	const cookie = `cq-spotify-refresh=${refresh_token};Path=/;HttpOnly=true;SameSite=Lax;`;

	return redirect(new URL('/rooms/new', request.referrer), {
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Set-Cookie': cookie
		}
	});
}

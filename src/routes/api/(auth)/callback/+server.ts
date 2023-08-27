import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';
import { SPOTIFY_CLIENT_SECRET as clientSecret } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from '../../../../.svelte-kit/types/src/routes';

const endpoint = 'https://accounts.spotify.com/api/token';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	const authStringBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
	const { searchParams } = new URL(url);
	const code = searchParams.get('code');
	const redirect_uri = `${url.origin}/auth/callback`;

	if (!code) {
		throw redirect(304, new URL('/auth/login', url.origin).toString());
	}

	const body = new URLSearchParams();
	body.append('grant_type', 'authorization_code');
	body.append('code', code);
	body.append('redirect_uri', redirect_uri);

	const result = await fetch(endpoint, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authStringBase64}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	const { access_token, refresh_token } = await result.json();

	cookies.set('cq-session', JSON.stringify({ access_token, refresh_token }), {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
	});

	const room = cookies.get('cq-room');

	if (room) {
		throw redirect(307, new URL(`/rooms/${room}`, url.origin).toString());
	}

	throw redirect(307, new URL('/lobby', url.origin).toString());
}

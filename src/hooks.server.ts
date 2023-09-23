import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	let Spotify = null;

	const cookie = event.cookies.get('cq-session');

	if (cookie) {
		const credentials = JSON.parse(cookie);

		if (credentials) {
			if (Date.now() >= credentials.expires) {
				console.log('hooks.server.ts: handle: expired token');
				event.cookies.delete('cq-session', { path: '/' });

				return await resolve(event);
			}

			Spotify = SpotifyApi.withAccessToken(clientId, credentials);
		}
	} else {
		if (event.url.pathname.startsWith('/lobby') && !event.url.search.includes('code')) {
			throw redirect(302, '/login');
		}

		return await resolve(event);
	}

	if (Spotify) {
		event.locals.user = await Spotify.currentUser.profile();
	}

	return await resolve(event);
}

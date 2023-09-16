import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';

export async function handle({ event, resolve }) {
	let Spotify = null;

	const cookie = event.cookies.get('cq-session');

	if (cookie) {
		const credentials = JSON.parse(cookie);

		if (credentials) {
			if (Date.now() >= credentials.expires) {
				event.cookies.delete('cq-session');
				return await resolve(event);
			}

			Spotify = SpotifyApi.withAccessToken(clientId, credentials);
		}
	}

	if (Spotify) {
		event.locals.user = await Spotify.currentUser.profile();
	}

	return await resolve(event);
}

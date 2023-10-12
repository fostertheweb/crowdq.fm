import { SpotifyApi, type AccessToken } from '@fostertheweb/spotify-web-api-ts-sdk';
import {
	PUBLIC_SPOTIFY_REDIRECT_URI as redirectUri,
	PUBLIC_SPOTIFY_CLIENT_ID as clientId
} from '$env/static/public';

const scopes = [
	'user-library-modify',
	'user-read-email',
	'user-read-private',
	'playlist-modify-public',
	'user-read-currently-playing',
	'user-modify-playback-state',
	'user-read-playback-state',
	'app-remote-control',
	'streaming'
];

export const Spotify = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);

export function createServerClient(session: AccessToken) {
	return SpotifyApi.withAccessToken(clientId, session);
}

export function postAccessToken() {
	return SpotifyApi.performUserAuthorization(clientId, redirectUri, scopes, '/api/authorize');
}

export function isPlaylistLink(url: string) {
	return url.includes('playlist');
}

export function isTrackLink(url: string) {
	return url.includes('track');
}

export async function getTracksFromLink(input: string) {
	// Example Spotify Track link
	// https://open.spotify.com/track/5L3ecxQnQ9qTBmnLQiwf0C?si=73095fc596a24d2b

	// Example Spotify Playlist link
	// https://open.spotify.com/playlist/37i9dQZEVXbnsvaMRlw1Tf?si=73806faca56442f1

	if (isPlaylistLink(input)) {
		throw new Error('Playlists not supported, drag and drop multiple tracks instead.');
	}

	let ids;

	if (input.includes('\n')) {
		const urls = input.split('\n');
		ids = urls.map((url) => extractIdFromUrl(url));
	} else {
		ids = [extractIdFromUrl(input)];
	}

	return await Spotify.tracks.get(ids);
}

function extractIdFromUrl(url: string) {
	const parts = url.split('/');

	if (!parts.includes('open.spotify.com')) {
		throw new Error('Invalid Spotify Link');
	}

	const tail = parts[parts.length - 1];
	const params = tail.split('?');

	return params[0];
}

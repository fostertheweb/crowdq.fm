import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { PUBLIC_SPOTIFY_CLIENT_ID as clientId } from '$env/static/public';

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

export const Spotify = SpotifyApi.withUserAuthorization(
	clientId,
	'http://localhost:5173/lobby',
	scopes
);

export function isPlaylistLink(url: string) {
	return url.includes('playlist');
}

export function isTrackLink(url: string) {
	return url.includes('track');
}

export function getTracksFromLink(url: string) {
	console.log(url);
	// Example Spotify Track link
	// https://open.spotify.com/track/5L3ecxQnQ9qTBmnLQiwf0C?si=73095fc596a24d2b

	// Example Spotify Playlist link
	// https://open.spotify.com/playlist/37i9dQZEVXbnsvaMRlw1Tf?si=73806faca56442f1
	const parts = url.split('/');

	if (!parts.includes('open.spotify.com')) {
		throw new Error('Invalid Spotify Link');
	}

	const tail = parts[parts.length - 1];
	const params = tail.split('?');

	if (isPlaylistLink(url)) {
		return console.log(params[0]);
	}

	if (isTrackLink(url)) {
		return console.log(params[0]);
	}

	throw new Error('Invalid Spotify Link');
}

import { get } from 'svelte/store';
import { userToken } from '$lib/stores/session';
import { spotifyDevice } from '$lib/stores/spotify';

type TrackId = string;
type PlaylistId = string;

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
		return getPlaylistTracks(params[0]);
	}

	if (isTrackLink(url)) {
		return getTrack(params[0]);
	}

	throw new Error('Invalid Spotify Link');
}

async function fetchSpotify(path: string) {
	const baseUrl = 'https://api.spotify.com/v1';
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${get(userToken)}`);

	const response = await fetch(baseUrl + path, {
		headers
	});

	const data = await response.json();

	return data;
}

export function getPlaylistTracks(playlistId: PlaylistId) {
	return fetchSpotify(`/playlists/${playlistId}/tracks`);
}

export function getTrack(trackId: TrackId) {
	return fetchSpotify(`/tracks/${trackId}`);
}

export function buildSpotifyHeaders(accessToken: string) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${accessToken}`);

	return headers;
}

async function putSpotify(path: string, body: any) {
	const baseUrl = 'https://api.spotify.com/v1';
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${get(userToken)}`);

	await fetch(baseUrl + path, {
		method: 'PUT',
		headers,
		body: JSON.stringify(body)
	});
}

export async function play(playback: any) {
	const device = get(spotifyDevice);
	const payload = playback
		? {
				uris: [`spotify:track:${playback?.item.provider_id}`],
				position_ms: playback?.position || 0
		  }
		: null;
	await putSpotify(`/me/player/play?device_id=${device}`, payload);
}

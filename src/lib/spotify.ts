type TrackId = string;
type PlaylistId = string;

export function getTracksFromLink(url: string) {
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

	if (parts.includes('track')) {
		const trackId = params[0];

		return getTrack(trackId);
	}

	if (parts.includes('playlist')) {
		const playlistId = params[0];

		return getPlaylistTracks(playlistId);
	}

	throw new Error('Invalid Spotify Link');
}

function get(path: string) {
	const token =
		'BQCydDwWHFShCzPeISv0le2WclW574VKJjVAms0BU2FlfFStosYOmoss9BA75fZzg9IFoaRQd5fXZAw6JRKQa2wQlyuAOjWuUU-scrTMuHVdUs9DVzU';
	const baseUrl = 'https://api.spotify.com/v1';
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`);

	return fetch(baseUrl + path, {
		headers
	});
}

export function getPlaylistTracks(playlistId: PlaylistId) {
	return get(`/playlists/${playlistId}/tracks`);
}

export function getTrack(trackId: TrackId) {
	return get(`/tracks/${trackId}`);
}

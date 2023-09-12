import { Spotify } from '$lib/spotify';

export async function load() {
	const isAuthenticated = await Spotify.getAccessToken();

	return {
		isAuthenticated: !!isAuthenticated
	};
}

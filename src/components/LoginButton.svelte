<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

	const scope = [
		'user-library-modify',
		'user-read-email',
		'user-read-private',
		'playlist-modify-public',
		'user-read-currently-playing',
		'user-modify-playback-state',
		'user-read-playback-state',
		'app-remote-control',
		'streaming'
	].join(' ');

	let loginUrl = '';

	onMount(() => {
		const origin = window.location.origin;
		let params = new URLSearchParams();

		params.append('response_type', 'code');
		params.append('client_id', PUBLIC_SPOTIFY_CLIENT_ID || '');
		params.append('scope', scope);
		params.append('redirect_uri', `${origin}/auth/callback`);

		loginUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
	});
</script>

<a
	href={loginUrl}
	class="leading flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-center font-general text-base font-semibold tracking-wide text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105"
>
	<span>Log in with Spotify</span>
</a>

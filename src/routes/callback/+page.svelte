<script lang="ts">
	import { Spotify } from '$lib/spotify';
	import { onMount } from 'svelte';

	onMount(async () => {
		const user = await Spotify.currentUser.profile();
		const token = await Spotify.getAccessToken();

		console.log({ user, token });
	});
</script>

<div>hello</div>

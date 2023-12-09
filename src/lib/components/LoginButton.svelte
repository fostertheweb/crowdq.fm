<script lang="ts">
	import { browser } from '$app/environment';
	import { postAccessToken } from '$lib/spotify';
	import IconSpotify from './icons/IconSpotify.svelte';

	function handleClick() {
		if (browser) {
			postAccessToken();
		}
	}
</script>

<button
	on:click={handleClick}
	class="leading mx-auto flex w-auto items-center justify-center gap-2 rounded-full bg-[#1cd760] px-16 py-3 text-center font-readex-pro text-base font-semibold text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-110">
	<IconSpotify />
	<span>Log in with Spotify</span>
</button>

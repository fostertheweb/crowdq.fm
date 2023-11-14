<script lang="ts">
	import { browser } from '$app/environment';
	import { postAccessToken } from '$lib/spotify';

	function handleClick() {
		if (browser) {
			postAccessToken();
		}
	}
</script>

<button
	on:click={handleClick}
	class="leading font-readex-pro flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105">
	<i class="fa-brands fa-spotify" />
	<span>Log in with Spotify</span>
</button>

<script lang="ts">
	import IconJoin from '$lib/components/icons/IconJoin.svelte';
	import IconSpotify from '$lib/components/icons/IconSpotify.svelte';
	import { postAccessToken } from '$lib/spotify';

	export let isMobile: boolean;

	function login() {
		postAccessToken();
	}

	function join() {
		postAccessToken();
	}
</script>

{#if isMobile}
	<button
		on:click={login}
		class="flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:brightness-125 dark:bg-green-600 dark:text-white">
		<IconSpotify />
		Log in</button>
{:else}
	<button
		on:click={join}
		class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200">
		<IconJoin />
		Join</button>
{/if}

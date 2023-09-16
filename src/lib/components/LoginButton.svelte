<script lang="ts">
	import { browser } from '$app/environment';
	import { Spotify } from '$lib/spotify';
	import { onMount } from 'svelte';
	import ContinueButton from './ContinueButton.svelte';
	import type { AccessToken, UserProfile } from '@spotify/web-api-ts-sdk';

	let credentials: AccessToken | null = null;
	let user: UserProfile;

	// onMount(async () => {
	// 	const credentials = await Spotify.getAccessToken();
	// 	user = await Spotify.currentUser.profile();
	// 	console.log({ credentials, user });
	// });

	async function handleClick() {
		if (browser) {
			const response = await Spotify.authenticate();
			console.log({ response });
		}
	}
</script>

{#if user}
	<ContinueButton />
{:else}
	<button
		on:click={handleClick}
		class="leading flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-center font-general text-base font-semibold tracking-wide text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105"
	>
		<i class="fa-brands fa-spotify" />
		<span>Log in with Spotify</span>
	</button>
{/if}

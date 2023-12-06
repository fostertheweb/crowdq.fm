<script lang="ts">
	import ContinueButton from '$lib/components/ContinueButton.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import { postAccessToken } from '$lib/spotify';
	import { Spotify } from '$lib/spotify.js';
	import { onMount } from 'svelte';

	import IconInfo from '$lib/components/icons/IconInfo.svelte';
	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';

	export let data;
	let user: UserProfile | null = data.user;

	onMount(async () => {
		const authKey = 'spotify-sdk:AuthorizationCodeWithPKCEStrategy:token';
		const authString = localStorage.getItem(authKey);
		const credentials = authString ? JSON.parse(authString) : null;

		if (credentials) {
			if (Date.now() >= credentials.expires) {
				localStorage.removeItem(authKey);
			} else {
				user = await Spotify.currentUser.profile();
				postAccessToken();
			}
		}
	});
</script>

<div
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-50 p-8 dark:bg-stone-900">
	<div class="cq-container flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-600">
		<div class="flex flex-col gap-6 px-2">
			<div class="flex justify-between">
				<h3
					class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-stone-200">
					crowdq<span class="text-orange-500">.</span>fm
				</h3>
				<div class="flex items-center gap-2">
					<div class="font-readex-pro text-lg font-medium text-stone-700 dark:text-stone-300">
						Log In
					</div>
				</div>
			</div>
		</div>

		{#if user}
			<div class="flex w-full flex-col gap-2">
				<ContinueButton name={user.display_name} />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<IconInfo />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{:else}
			<div class="flex w-full flex-col gap-2">
				<LoginButton />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<IconInfo />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.cq-container {
		width: 24rem;
	}
</style>

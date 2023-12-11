<script lang="ts">
	import ContinueButton from '$lib/components/ContinueButton.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import { postAccessToken } from '$lib/spotify';
	import { Spotify } from '$lib/spotify.js';
	import { onMount } from 'svelte';

	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import IconInfo from '$lib/components/icons/IconInfo.svelte';
	import type { UserProfile } from '@fostertheweb/spotify-web-sdk';

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

<main class="flex h-screen flex-col items-center">
	<div class="cq-container flex w-full flex-col px-4 pt-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wide text-stone-700 dark:text-stone-50">
				crowdq<span class="text-jake-400">.</span>fm
			</h3>

			{#if user}
				<CurrentUser {user} />
			{/if}
		</header>

		<Divider />

		{#if user}
			<div class="flex w-full flex-col gap-2">
				<ContinueButton name={user.display_name} />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<IconInfo />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{:else}
			<div class="space-y-2">
				<LoginButton />
				<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
					<IconInfo />
					<span>Spotify Premium required.</span>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	.cq-container {
		width: 480px;
	}
</style>

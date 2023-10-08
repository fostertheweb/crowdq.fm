<script lang="ts">
	import { onMount } from 'svelte';
	import { postAccessToken, Spotify } from '$lib/spotify';
	import HeaderWithUser from '$lib/components/HeaderWithUser.svelte';
	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';
	import { goto } from '$app/navigation';
	import Divider from '$lib/components/Divider.svelte';
	import IconSpotify from '$lib/components/icons/IconSpotify.svelte';
	import IconMusic from '$lib/components/icons/IconMusic.svelte';
	import IconArrowRight from '$lib/components/icons/IconArrowRight.svelte';

	export let data;

	let user: UserProfile | null = data.user;

	onMount(async () => {
		const { authenticated } = await postAccessToken();

		if (authenticated) {
			if (data.room) {
				goto(`/rooms/${data.room}`);
			}

			if (!user) {
				user = await Spotify.currentUser.profile();
			}
		}
	});
</script>

<main
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-50 p-8 dark:bg-stone-900">
	{#if data.room}
		<div class="cq-container flex w-full flex-col gap-6">
			<header class="flex items-center justify-between">
				<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
					crowdq<span class="text-orange-500">.</span>fm
				</h3>
			</header>
			<Divider />
			<div
				class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-8 text-stone-400 dark:bg-stone-800 dark:text-stone-500">
				<div class="flex animate-pulse items-center gap-4 text-2xl">
					<IconSpotify />
					<IconArrowRight />
					<IconMusic />
				</div>
				<div class="font-general font-medium">Returning to Room</div>
			</div>
		</div>
	{:else}
		<div class="cq-card flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-700">
			<div class="flex flex-col gap-4 px-2">
				<HeaderWithUser name={user?.display_name} image={user?.images[0].url} />

				<form method="POST">
					<button
						type="submit"
						class="leading flex w-full items-center justify-center gap-2 rounded-md bg-rose-500 px-8 py-3 text-center font-general text-base font-semibold tracking-wide text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105">
						<i class="fa-duotone fa-sparkles" />
						Create Room
					</button>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	.cq-card {
		width: 24rem;
	}

	.cq-container {
		max-width: 480px;
	}
</style>

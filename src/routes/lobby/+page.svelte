<script lang="ts">
	import { goto } from '$app/navigation';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import IconCreateRoom from '$lib/components/icons/IconCreateRoom.svelte';
	import IconDisc from '$lib/components/icons/IconDisc.svelte';
	import { postAccessToken, Spotify } from '$lib/spotify';
	import type { UserProfile } from '@fostertheweb/spotify-web-sdk';
	import { onMount } from 'svelte';

	export let data;

	let user: UserProfile | null = data.user;

	onMount(async () => {
		const { authenticated } = await postAccessToken();

		if (authenticated) {
			if (data.room) {
				goto(`/rooms/${data.room.slug}`);
			}

			if (!user) {
				user = await Spotify.currentUser.profile();
			}
		}
	});
</script>

<main class="flex h-screen flex-col items-center">
	<div class="cq-container flex w-full flex-col px-4 pt-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wide text-stone-700 dark:text-stone-50">
				crowdq<span class="text-jake-500">.</span>fm
			</h3>

			{#if user}
				<CurrentUser {user} />
			{/if}
		</header>

		<Divider />

		{#if data.room}
			<div
				class=" flex flex-col items-center gap-6 pt-12 text-sm text-stone-300 dark:text-stone-500">
				<IconDisc lg />
				<div class="text-center">
					<h4 class="font-readex-pro text-base font-medium text-stone-500/80">
						Returning to {data.room.hostedBy}'s Room
					</h4>
					<p class="mt-2 text-stone-400">Don't kill the vibe!</p>
				</div>
			</div>
		{:else}
			<form method="POST">
				<button
					type="submit"
					class="leading mx-auto flex items-center gap-2 rounded-full border border-sienna-700/30 bg-sienna-600 px-8 py-2 font-readex-pro font-medium text-white shadow-md shadow-sienna-400/30 transition ease-linear hover:brightness-110 dark:shadow-sienna-500/20">
					<IconCreateRoom />
					Create Room
				</button>
				<!-- TODO: can i get a loading state?
					<div class="flex items-center justify-center gap-2 p-2 text-sm text-stone-400">
						<IconDisc />
						<span>Creating room...</span>
					</div>
				-->
			</form>
		{/if}
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>

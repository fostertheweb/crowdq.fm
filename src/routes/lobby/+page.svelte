<script lang="ts">
	import { onMount } from 'svelte';
	import { Spotify, authorize } from '$lib/spotify';
	import HeaderWithUser from '$lib/components/HeaderWithUser.svelte';
	import type { UserProfile } from '@spotify/web-api-ts-sdk';

	export let data;
	let user: UserProfile | null = data.user;

	onMount(async () => {
		const credentials = await Spotify.getAccessToken();

		if (!data.user) {
			if (credentials) {
				await authorize(credentials);
				user = await Spotify.currentUser.profile();
			}
		}
	});
</script>

<main
	class="flex h-screen flex-col items-center justify-start gap-8 bg-stone-100 p-8 dark:bg-stone-800"
>
	<div class="cq-card flex flex-col gap-8 rounded bg-white p-8 shadow dark:bg-stone-700">
		<div class="flex flex-col gap-4 px-2">
			<HeaderWithUser name={user?.display_name} image={user?.images[0].url} />

			<a
				href="/rooms/chipwheel"
				class="leading flex w-full items-center justify-center gap-2 rounded-md bg-rose-500 px-8 py-3 text-center font-general text-base font-semibold tracking-wide text-white shadow-sm filter transition ease-linear hover:shadow-md hover:brightness-105"
			>
				<i class="fa-duotone fa-sparkles" />
				Create Room
			</a>
		</div>
	</div>
</main>

<style>
	.cq-card {
		width: 24rem;
	}
</style>

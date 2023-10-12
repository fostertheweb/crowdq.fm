<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import mobile from 'is-mobile';
	import { playQueue } from '$lib/stores/queue';
	import { party } from '$lib/stores/party';
	import { Spotify, postAccessToken } from '$lib/spotify';
	import { playNextTrack, pause } from '$lib/player';
	import Player from '$lib/components/Player.svelte';
	import ListenerStack from '$lib/components/ListenerStack.svelte';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import JoinButton from '$lib/components/JoinButton.svelte';
	import HostDetails from '$lib/components/HostDetails.svelte';
	import { createDatabase, createUser, itemsTableToCollection, store } from '$lib/db';
	import { createPartySocket, createStoreSocket } from '$lib/party';
	import PlayQueue from '$lib/components/PlayQueue.svelte';
	import IconSliders from '$lib/components/icons/IconSliders.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';

	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';
	import type PartySocket from 'partysocket';

	export let data;

	let user: UserProfile | null = data.user;
	let hasJoined = false;
	let storeSocket: PartySocket | null;
	let tableListenerId: string;
	let isMobile = false;

	onMount(async () => {
		isMobile = mobile();
		storeSocket = createStoreSocket($page.params.slug);
		await createDatabase(storeSocket);

		$party = createPartySocket($page.params.slug);
		$party.addEventListener('message', async (event) => {
			console.log({ event });

			switch (event.data) {
				case 'play_next_track':
					await playNextTrack();
					break;
				case 'pause':
					await pause();
					break;
				default:
					console.log('hehe');
					break;
			}
		});
		$playQueue = itemsTableToCollection(store.getTable('items'));

		tableListenerId = store.addTableListener('items', () => {
			$playQueue = itemsTableToCollection(store.getTable('items'));
		});

		const authKey = 'spotify-sdk:AuthorizationCodeWithPKCEStrategy:token';
		const authString = localStorage.getItem(authKey);
		const credentials = authString ? JSON.parse(authString) : null;

		if (credentials && Date.now() >= credentials.expires) {
			console.log('expired, request new token');
			await postAccessToken();
			localStorage.removeItem(authKey);
		}

		// const storedHasJoined = localStorage.getItem('cq-join');
		// hasJoined = storedHasJoined && parseInt(storedHasJoined) === 1 ? true : false;

		// if (!user && hasJoined) {
		// 	user = await Spotify.currentUser.profile();
		// }

		if (user) {
			store.setRow('listeners', user.id, createUser(user, true));
		}
	});

	onDestroy(() => {
		store.delListener(tableListenerId);
	});
</script>

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 pb-0 dark:bg-stone-900">
	<div
		class="left-0 top-0 z-30 hidden h-screen w-screen bg-stone-900 bg-opacity-30 p-4 backdrop-blur-sm">
		<div
			class="flex h-full w-full items-center justify-center rounded border-4 border-dashed border-stone-200">
			<div class="font-general text-2xl font-semibold tracking-wide text-stone-100">
				<div class="flex flex-col items-center gap-2">
					<span>Add to Queue</span>
				</div>
			</div>
		</div>
	</div>

	<div class="cq-container flex w-full flex-col gap-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
				crowdq<span class="text-orange-500">.</span>fm
			</h3>

			{#if user}
				<CurrentUser {user} />
			{:else}
				<JoinButton {isMobile} />
			{/if}
		</header>

		<Divider />

		<div class="flex items-center justify-between">
			{#if data.isHost}
				<button
					class="flex items-center gap-2 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
					<IconSliders />
					<span class="font-general font-medium tracking-wide">Settings</span>
				</button>
			{:else}
				<HostDetails room={data.room} />
			{/if}

			<div class="flex items-center gap-2">
				{#if !isMobile}
					<ListenerStack />
				{/if}
				<ShareButton />
			</div>
		</div>

		{#if !isMobile}
			<Divider />

			<Player isHost={data.isHost} />
		{/if}

		<Divider />

		<PlayQueue {isMobile} {user} devices={data.devices} />
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import HostDetails from '$lib/components/HostDetails.svelte';
	import JoinButton from '$lib/components/JoinButton.svelte';
	import ListenerStack from '$lib/components/ListenerStack.svelte';
	import PlayQueue from '$lib/components/PlayQueue.svelte';
	import Player from '$lib/components/Player.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import IconSliders from '$lib/components/icons/IconSliders.svelte';
	import { createDatabase, createUser, itemsTableToCollection, store } from '$lib/db';
	import { createPartySocket, createStoreSocket } from '$lib/party';
	import { UniversalPlayer, playNextTrack } from '$lib/player';
	import { Spotify, postAccessToken } from '$lib/spotify';
	import { party } from '$lib/stores/party';
	import { playQueue } from '$lib/stores/queue';
	import mobile from 'is-mobile';
	import { onDestroy, onMount } from 'svelte';

	import { currentQueueItem, playerPosition, playerStatus } from '$lib/stores/player.js';
	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';
	import type PartySocket from 'partysocket';

	export let data;

	let user: UserProfile | null = data.user;
	let isHost = data.isHost;
	let storeSocket: PartySocket | null;
	let tableListenerId: string;
	let isMobile = false;
	let userId = user?.id;

	onMount(async () => {
		isMobile = mobile();
		storeSocket = createStoreSocket($page.params.slug);
		await createDatabase(storeSocket);

		$party = createPartySocket($page.params.slug);

		$party.addEventListener('message', async (event) => {
			const message = JSON.parse(event.data);
			console.log(message);

			// TODO: don't call spotify player without authed user
			switch (message.type) {
				case 'play_next_track':
					await playNextTrack();
					break;
				case 'pause':
					await UniversalPlayer.pause();
					break;
				case 'resume':
					await UniversalPlayer.resume();
					break;
				case 'connect':
					// console.log(message);
					break;
				case 'remove':
					store.delRow(message.table, message.id);
					break;
				case 'sync_request':
					const position = await UniversalPlayer.getPosition();

					$party?.send(
						JSON.stringify({
							type: 'sync_response',
							id: message.id,
							item: $currentQueueItem,
							status: $playerStatus,
							position
						})
					);
					break;
				case 'sync_response':
					// TODO: play music muted
					$currentQueueItem = message.item;
					$playerPosition = message.position;
					$playerStatus = message.status;
					break;
				default:
					console.log('Event handler not implemented', event.data);
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

		if (credentials) {
			await postAccessToken();

			if (!user) {
				user = await Spotify.currentUser.profile();
				userId = user.id;
				isHost = userId === data.room.hostId;
				store.setRow('listeners', $party.id, createUser(user, isHost));
			} else {
				isHost = user.id === data.room.hostId;
				store.setRow('listeners', $party.id, createUser(user, isHost));
			}
		} else {
			if (userId) {
				store.delRow('listeners', $party.id);
			}
		}
	});

	onDestroy(() => {
		if ($party) {
			store.delRow('listeners', $party.id);
		}

		store.delListener(tableListenerId);
	});
</script>

<main class="flex h-screen justify-center">
	<div
		class="left-0 top-0 z-30 hidden h-screen w-screen bg-stone-900 bg-opacity-30 p-4 backdrop-blur-sm">
		<div
			class="flex h-full w-full items-center justify-center rounded border-4 border-dashed border-stone-200">
			<div class="font-readex-pro text-2xl font-semibold tracking-wide text-stone-100">
				<div class="flex flex-col items-center gap-2">
					<span>Add to Queue</span>
				</div>
			</div>
		</div>
	</div>

	<div class="cq-container flex w-full flex-col px-4 pt-6">
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
			{#if isHost}
				<button
					disabled
					class="flex cursor-not-allowed items-center gap-1.5 rounded-full bg-stone-200/60 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200">
					<IconSliders />
					<span class="font-readex-pro font-medium">Settings</span>
				</button>
			{:else}
				<HostDetails room={data.room} />
			{/if}

			<div class="flex items-center gap-2">
				{#if !isMobile}
					<ListenerStack currentUser={user} />
				{/if}
				<ShareButton />
			</div>
		</div>

		{#if !isMobile}
			<Divider />

			<Player {isHost} />
		{/if}

		<Divider />

		<PlayQueue {isMobile} {user} devices={data.devices} />
	</div>
</main>

<style>
	.cq-container {
		box-sizing: border-box;
		max-width: 480px;
	}
</style>

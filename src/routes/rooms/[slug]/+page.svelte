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
	import IconAudioDisabled from '$lib/components/icons/IconAudioDisabled.svelte';
	import IconPlusMusic from '$lib/components/icons/IconPlusMusic.svelte';
	import IconSliders from '$lib/components/icons/IconSliders.svelte';
	import {
		createDatabase,
		createUser,
		itemsTableToCollection,
		listenersTableToCollection,
		store
	} from '$lib/db';
	import { handleDragEnter, handleDragLeave, handleDrop } from '$lib/drag-events';
	import { createPartySocket, createStoreSocket } from '$lib/party';
	import { getPosition, next, pause, play, resume } from '$lib/player';
	import { Spotify, postAccessToken } from '$lib/spotify';
	import { listeners, party } from '$lib/stores/party';
	import { currentQueueItem, playerPosition, playerStatus } from '$lib/stores/player';
	import { playQueue, showOverlay } from '$lib/stores/queue';
	import mobile from 'is-mobile';
	import { onDestroy, onMount } from 'svelte';

	import type { Listener, QueueItem } from '$lib/types';
	import type { UserProfile } from '@fostertheweb/spotify-web-sdk';
	import type PartySocket from 'partysocket';

	export let data;

	let user: UserProfile | null = data.user;
	let isHost = data.isHost;
	let storeSocket: PartySocket | null;
	let transactionListenerId: string;
	let isMobile = false;
	let isAudioEnabled = isHost;
	let userId = user?.id;

	$: if ($currentQueueItem && $playerPosition > $currentQueueItem.duration) {
		console.log('Progress exceeded duration, play next track');
		next($playQueue.shift() || null, isAudioEnabled);
		$playQueue = $playQueue;
	}

	async function handleEnableAudio() {
		if ($currentQueueItem) {
			await play($currentQueueItem, $playerPosition);
		}

		isAudioEnabled = true;
	}

	onMount(async () => {
		isMobile = mobile();
		storeSocket = createStoreSocket($page.params.slug);

		// TODO: get or create
		await createDatabase(storeSocket);

		$playQueue = itemsTableToCollection(store.getTable('items'));
		$listeners = listenersTableToCollection(store.getTable('listeners'));
		$party = createPartySocket($page.params.slug);

		$party.addEventListener('message', async (event) => {
			const message = JSON.parse(event.data);

			console.log(message);

			switch (message.type) {
				case 'play_next_track':
					next($playQueue.shift() || null, isAudioEnabled);
					$playQueue = $playQueue;
					break;
				case 'pause':
					pause();
					break;
				case 'resume':
					resume();
					break;
				case 'remove':
					store.delRow(message.table, message.id);
					break;
				case 'sync_request':
					let position = 0;
					if (isAudioEnabled) {
						position = await getPosition();
					} else {
						position = $playerPosition;
					}

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
					if (message.item) {
						const currentIndex = $playQueue.findIndex((item) => item.id === message.item.id);
						console.log({ currentIndex });
						$playQueue.splice(0, currentIndex + 1);
						console.log('Play Queue after splice', $playQueue);
						$playQueue = $playQueue;
					}

					switch (message.status) {
						case 'playing':
							isAudioEnabled = false;
							$currentQueueItem = message.item;
							$playerPosition = message.position;
							$playerStatus = message.status;
							break;

						case 'idle':
							$currentQueueItem = null;
							$playerPosition = 0;
							$playerStatus = 'idle';
							break;

						default:
							$currentQueueItem = message.item;
							$playerPosition = message.position;
							$playerStatus = message.status;
							break;
					}

					break;
				default:
					console.log('Event handler not implemented: ', message);
					break;
			}
		});

		transactionListenerId = store.addDidFinishTransactionListener((_, getTransactionChanges) => {
			const changes = getTransactionChanges();

			changes.forEach((change) => {
				if (change) {
					Object.entries(change).forEach(([tableId, row]) => {
						if (tableId) {
							Object.entries(row).forEach(([rowId, rowData]: [string, any]) => {
								switch (tableId) {
									case 'items':
										$playQueue.push({ id: rowId, ...rowData } as QueueItem);
										$playQueue = $playQueue;
										break;
									case 'listeners':
										$listeners.push({ id: rowId, ...rowData } as Listener);
										$listeners = $listeners;
										break;
								}
							});
						}
					});
				}
			});
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
				store.setRow('listeners', user.id, createUser(user, isHost));
			} else {
				isHost = user.id === data.room.hostId;
				store.setRow('listeners', user.id, createUser(user, isHost));
			}
		} else {
			if (userId) {
				store.delRow('listeners', userId);
			}
		}
	});

	onDestroy(() => {
		if (userId) {
			store.delRow('listeners', userId);
		}

		store.delListener(transactionListenerId);
	});
</script>

<svelte:document
	on:dragover|preventDefault
	on:dragend|preventDefault
	on:dragstart|preventDefault
	on:dragexit|preventDefault
	on:drop|preventDefault={handleDrop}
	on:dragenter|preventDefault={handleDragEnter} />

{#if $showOverlay}
	<div
		role="banner"
		aria-label="Drop here to add songs to queue"
		aria-roledescription="Drag and drop overlay to add songs to queue"
		on:dragleave|preventDefault={handleDragLeave}
		class="fixed left-0 top-0 z-30 h-screen w-screen bg-stone-900 bg-opacity-40 p-4 backdrop-blur-sm">
		<div class="flex h-full w-full items-center justify-center">
			<div class="font-readex-pro text-2xl font-semibold text-stone-100">
				<div class="flex flex-col items-center gap-4 drop-shadow">
					<IconPlusMusic xl />
					<span>Add to Queue</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<main class="flex flex-col items-center">
	{#if !isAudioEnabled && user && !isMobile}
		<div class="w-full bg-amber-100 p-2 dark:bg-amber-700">
			<div
				class="mx-auto flex items-center justify-center gap-2 px-4 text-center text-amber-900 dark:text-amber-50">
				<IconAudioDisabled />
				<p class="mr-2 text-sm">Audio currently disabled.</p>
				<button
					on:click={handleEnableAudio}
					class="flex items-center gap-1 rounded-full bg-amber-300/60 px-2 py-1 text-xs text-amber-900 hover:bg-amber-300/80 dark:bg-amber-900 dark:text-amber-200 dark:hover:bg-amber-900/70 dark:hover:text-amber-50">
					<span class="font-readex-pro font-medium">Enable Audio</span>
				</button>
			</div>
		</div>
	{/if}

	<div class="cq-container flex max-h-screen w-full flex-col px-4 pt-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wide text-stone-700 dark:text-stone-50">
				crowdq<span class="text-jake-400">.</span>fm
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

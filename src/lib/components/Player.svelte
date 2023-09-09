<script lang="ts">
	import { onMount } from 'svelte';
	import { userToken } from '$lib/stores/session';
	import { currentQueueItem, playerPosition, playerStatus } from '$lib/stores/player';
	import { get } from 'svelte/store';
	import { spotifyDevice } from '$lib/stores/spotify';
	import VolumeControl from './VolumeControl.svelte';
	import { playQueue } from '$lib/stores/queue';
	import PlayerControl from './PlayerControl.svelte';

	import type { PlayerState } from '$lib/types';

	let player;
	let progressInterval: string | number | NodeJS.Timeout | undefined;

	$: console.log($currentQueueItem);
	$: console.log($playerStatus);
	$: console.log($playerPosition);
	$: console.log($playQueue);

	$: progress = $playerPosition;
	$: duration = $currentQueueItem?.duration || 0;

	$: if ($playerStatus === 'playing') {
		if (!progressInterval) {
			progressInterval = setInterval(() => {
				progress += 1000;
			}, 1000);
		}
	} else {
		clearInterval(progressInterval);
	}

	onMount(() => {
		if (get(userToken)) {
			const script = document.createElement('script');

			script.src = 'https://sdk.scdn.co/spotify-player.js';

			document.body.appendChild(script);

			// TODO: define types for Spotify SDK
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = get(userToken);

				player = new window.Spotify.Player({
					name: 'crowdq.fm',
					getOAuthToken(callback: (token: string | null) => void) {
						callback(token);
					},
					volume: 0.5
				});

				player.addListener('player_state_changed', (state: PlayerState) => {
					if (!state) {
						playerStatus.set('idle');
						playerPosition.set(0);
					} else {
						if (state.loading) {
							playerStatus.set('loading');
							playerPosition.set(state.position);
						}

						if (state.paused) {
							playerPosition.set(state.position);

							// Track finished playing
							const previousTracks = state.track_window?.previous_tracks;
							if (previousTracks && previousTracks.length > 0) {
								console.log('Play Next Track');
							} else {
								playerStatus.set('paused');
							}
						} else {
							playerStatus.set('playing');
							playerPosition.set(state.position);
						}
					}
				});

				player.addListener('ready', ({ device_id }) => {
					spotifyDevice.set(device_id);
				});

				// Not Ready
				player.addListener('not_ready', ({ device_id }) => {
					console.log('Device ID has gone offline', device_id);
				});

				player.addListener('initialization_error', ({ message }) => {
					console.error(message);
				});

				player.addListener('authentication_error', ({ message }) => {
					console.error(message);
				});

				player.addListener('account_error', ({ message }) => {
					console.error(message);
				});

				player.activateElement();
				player.connect();
			};
		}
	});
</script>

<div class="flex items-center space-x-4">
	{#if $currentQueueItem}
		<img src={$currentQueueItem.artwork} alt="" class="h-28 w-28 rounded" />
	{:else}
		<div class="flex h-28 w-28 items-center justify-center rounded bg-stone-200 dark:bg-stone-600">
			<i class="fa-solid fa-music text-5xl text-stone-50 drop-shadow dark:text-stone-400" />
		</div>
	{/if}
	<div class="space-y-1">
		{#if $currentQueueItem}
			<div class="text-lg dark:text-white">{$currentQueueItem.name}</div>
		{:else}
			<div class="text-lg dark:text-white">--</div>
		{/if}
		{#if $currentQueueItem}
			<div class="text-base text-stone-500 dark:text-stone-400">
				{$currentQueueItem.artists}
			</div>
		{:else}
			<div class="text-base text-stone-500 dark:text-stone-400">--</div>
		{/if}
	</div>
</div>

<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
	<div
		class="cq-progress-bar h-1.5 rounded-full bg-[#db82f1]"
		style="width: {duration > 0 ? (progress / duration) * 100 : 0}%"
	/>
</div>

<div class="flex items-center justify-between">
	<div class="space-x-2">
		<PlayerControl />

		<button
			class="h-8 w-8 rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
			><i class="fa-regular fa-heart fa-lg" /></button
		>
		<button
			class="h-8 w-8 rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
			><i class="fa-regular fa-thumbs-down fa-lg" /></button
		>
	</div>

	<VolumeControl />
</div>

<style>
	.cq-progress-bar {
		transition: width 1s linear;
	}
</style>

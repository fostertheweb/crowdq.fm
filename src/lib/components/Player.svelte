<script lang="ts">
	import { onMount } from 'svelte';
	import { userToken } from '$lib/stores/session';
	import { currentPlayback, transformSpotifyState } from '$lib/stores/player';
	import { get } from 'svelte/store';
	import { spotifyDevice } from '$lib/stores/spotify';
	import VolumeControl from './VolumeControl.svelte';
	import type { PlayerState } from '$lib/types';
	import { play } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';

	let player;

	$: console.log($currentPlayback);
	$: console.log($playQueue);

	async function playNextTrack() {
		const nextItem = $playQueue[$playQueue.indexOf($currentPlayback?.item) + 1];

		$currentPlayback = { ...$currentPlayback, item: nextItem };
		console.log(nextItem);

		await play({ item: nextItem });
	}

	onMount(() => {
		console.log({ userToken: get(userToken) });
		if (get(userToken)) {
			const script = document.createElement('script');

			script.src = 'https://sdk.scdn.co/spotify-player.js';

			document.body.appendChild(script);

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
					currentPlayback.set(transformSpotifyState(state));

					// Track finished playing
					if (state.paused && state.track_window?.previous_tracks?.length > 0) {
						console.log('Play Next Track');
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
	{#if $currentPlayback}
		<img src={$currentPlayback.item.artwork} alt="" class="h-28 w-28 rounded" />
	{:else}
		<div class="flex h-28 w-28 items-center justify-center rounded bg-stone-200 dark:bg-stone-600">
			<i class="fa-solid fa-music text-5xl text-stone-50 drop-shadow dark:text-stone-400" />
		</div>
	{/if}
	<div class="space-y-1">
		{#if $currentPlayback}
			<div class="text-lg dark:text-white">{$currentPlayback.item.name}</div>
		{:else}
			<div class="text-lg dark:text-white">--</div>
		{/if}
		{#if $currentPlayback}
			<div class="text-base text-stone-500 dark:text-stone-400">
				{$currentPlayback.item.artists}
			</div>
		{:else}
			<div class="text-base text-stone-500 dark:text-stone-400">--</div>
		{/if}
	</div>
</div>

<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
	<div class="h-1.5 rounded-full bg-[#db82f1]" style="width: 45%" />
</div>

<div class="flex items-center justify-between">
	<div class="space-x-2">
		<button
			on:click={playNextTrack}
			class="h-10 w-10 rounded-full bg-orange-200 text-orange-800 hover:bg-orange-300 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
			><i class="fa-solid fa-play fa-lg -mr-0.5" /></button
		>
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

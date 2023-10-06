<script lang="ts">
	import { onMount } from 'svelte';
	import { extractColors } from 'extract-colors';
	import { accentColor, currentQueueItem, playerPosition, playerStatus } from '$lib/stores/player';
	import { spotifyDevice } from '$lib/stores/spotify';
	import VolumeControl from './VolumeControl.svelte';
	import { playQueue } from '$lib/stores/queue';
	import PlayerControl from './PlayerControl.svelte';
	import { Spotify } from '$lib/spotify';
	import IconHeart from './icons/IconHeart.svelte';
	import IconThumbsDown from './icons/IconThumbsDown.svelte';
	import IconMusic from './icons/IconMusic.svelte';

	let player;
	let progressInterval: ReturnType<typeof setInterval>;
	let testColors: Array<string> = [];
	let playNextIntervalId: ReturnType<typeof setInterval>;
	let trackEnd = false;

	$: console.log({ currentQueueItem: $currentQueueItem });
	$: console.log({ playerStatus: $playerStatus });
	$: console.log({ playerPosition: $playerPosition });

	$: progress = $playerPosition;
	$: duration = $currentQueueItem?.duration || 0;
	$: percent = (progress / duration) * 100 + '%';

	$: if ($playerStatus === 'playing') {
		progressInterval = setInterval(() => {
			progress += 1000;
			clearInterval(progressInterval);
		}, 1000);
	} else {
		clearInterval(progressInterval);
	}

	$: if ($currentQueueItem?.artwork) {
		extractColors($currentQueueItem.artwork, {
			crossOrigin: 'anonymous'
		}).then((colors) => {
			if (colors) {
				$accentColor = colors[0].hex;
				testColors = colors.map((c) => c.hex);
			}
		});
	}

	$: if (trackEnd) {
		playNextIntervalId = setInterval(async () => {
			clearInterval(playNextIntervalId);
			const nextItem = $playQueue[$playQueue.indexOf($currentQueueItem!) + 1];
			if (nextItem) {
				// why is this not working? lol
				duration = nextItem.duration;
				$currentQueueItem = nextItem;
				await Spotify.player.startResumePlayback($spotifyDevice!, undefined, [
					`spotify:track:${nextItem.providerId}`
				]);
				trackEnd = false;
			}
		}, 500);
	}

	onMount(async () => {
		const credentials = await Spotify.getAccessToken();

		if (credentials?.access_token) {
			const script = document.createElement('script');
			script.src = 'https://sdk.scdn.co/spotify-player.js';
			document.body.appendChild(script);

			// TODO: define types for Spotify SDK
			window.onSpotifyWebPlaybackSDKReady = () => {
				player = new window.Spotify.Player({
					name: 'crowdq.fm',
					getOAuthToken(callback) {
						callback(credentials.access_token);
					},
					volume: 0.5
				});

				player.addListener('player_state_changed', (state) => {
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
								playerStatus.set('loading');
								trackEnd = true;
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
					if (device_id) {
						spotifyDevice.set(device_id);
					}
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

<div class="relative flex items-center gap-4">
	<div class="absolute right-0 top-0 flex items-center space-x-2">
		{#each testColors as color}
			<div class="h-4 w-4 rounded bg-stone-100" style:background={color} />
		{/each}
	</div>
	{#if $currentQueueItem}
		<img src={$currentQueueItem.artwork} alt="" class="h-28 w-28 rounded shadow-md" />
	{:else}
		<div class="flex h-28 w-28 items-center justify-center rounded bg-stone-200 dark:bg-stone-600">
			<span class="text-5xl text-stone-50 drop-shadow dark:text-stone-400">
				<IconMusic />
			</span>
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
		class="cq-progress-bar h-1.5 rounded-full bg-transparent"
		style:background={$accentColor}
		style:width={percent} />
</div>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<PlayerControl />

		<button
			class="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
			<IconHeart />
		</button>
		<button
			class="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600">
			<IconThumbsDown />
		</button>
	</div>

	<VolumeControl />
</div>

<style>
	.cq-progress-bar {
		transition: width 1s linear;
	}
</style>

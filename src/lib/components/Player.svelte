<script lang="ts">
	import { UniversalPlayer } from '$lib/player';
	import { Spotify } from '$lib/spotify';
	import {
		SpotifyPlayer,
		YouTubePlayer,
		accentColor,
		currentQueueItem,
		playerPosition,
		playerStatus
	} from '$lib/stores/player';
	import { playQueue } from '$lib/stores/queue';
	import { spotifyDevice } from '$lib/stores/spotify';
	import { extractColors } from 'extract-colors';
	import { onDestroy, onMount } from 'svelte';
	import LikeButton from './LikeButton.svelte';
	import PlayerControl from './PlayerControl.svelte';
	import VolumeControl from './VolumeControl.svelte';

	export let isHost = false;

	let progressInterval: ReturnType<typeof setInterval>;
	let testColors: Array<string> = [];
	let playNextIntervalId: ReturnType<typeof setInterval>;
	let trackEnd = false;

	$: progress = $playerPosition;
	$: duration = $currentQueueItem?.duration || 0;
	$: percent = (progress / duration) * 100 || 0;

	$: if ($playerStatus === 'playing') {
		clearInterval(progressInterval);
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
				$currentQueueItem = nextItem;
				trackEnd = false;
				await UniversalPlayer.play({ item: nextItem, position: 0, status: 'loading' });
			}
		}, 750);
	}

	onMount(async () => {
		const youtubePlayerScript = document.createElement('script');
		youtubePlayerScript.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(youtubePlayerScript);

		window.onYouTubeIframeAPIReady = () => {
			const player = new window.YT.Player('yt-player', {
				playerVars: {
					fs: 0,
					enablejsapi: 1,
					controls: 0,
					disablekb: 1,
					modestbranding: 1,
					origin: window.location.origin
				},
				events: {
					onReady(event) {
						event.target.setVolume(25);
					},
					onStateChange(event: any) {
						// update state
						console.log('YouTube State Change:', event);
						$playerPosition = Math.ceil(event.target.getCurrentTime() * 1000);

						switch (event.target.getPlayerState()) {
							case 0:
								clearInterval(progressInterval);
								$playerPosition = 0;
								$playerStatus = 'loading';
								trackEnd = true;
								break;
							case 1:
								$playerStatus = 'playing';
								break;
							case 2:
								clearInterval(progressInterval);
								$playerStatus = 'paused';
								break;
							default:
								$playerPosition = 0;
								$playerStatus = 'idle';
								break;
						}
					}
				}
			});

			$YouTubePlayer = player;
		};

		const credentials = await Spotify.getAccessToken();

		if (credentials?.access_token) {
			const spotifyPlayerScript = document.createElement('script');
			spotifyPlayerScript.src = 'https://sdk.scdn.co/spotify-player.js';
			document.body.appendChild(spotifyPlayerScript);

			window.onSpotifyWebPlaybackSDKReady = () => {
				const player = new window.Spotify.Player({
					name: 'crowdq.fm',
					getOAuthToken(callback) {
						callback(credentials.access_token);
					},
					volume: 0.25
				});

				player.addListener('player_state_changed', (state) => {
					if (!state) {
						clearInterval(progressInterval);
						playerStatus.set('idle');
						playerPosition.set(0);
					} else {
						playerPosition.set(state.position);

						if (state.loading) {
							clearInterval(progressInterval);
							playerStatus.set('loading');
						}

						if (state.paused) {
							clearInterval(progressInterval);

							// Track finished playing
							const previousTracks = state.track_window?.previous_tracks;
							if (previousTracks && previousTracks.length > 0) {
								clearInterval(progressInterval);
								playerStatus.set('loading');
								trackEnd = true;
							} else {
								// TODO: prevent flash of play button
								clearInterval(progressInterval);
								playerStatus.set('paused');
							}
						}
					}
				});

				player.addListener('ready', ({ device_id }) => {
					if (device_id) {
						spotifyDevice.set(device_id);
					}
				});

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

				$SpotifyPlayer = player;
			};
		}
	});

	onDestroy(() => {
		clearInterval(progressInterval);
		clearInterval(playNextIntervalId);
	});
</script>

<div class="flex flex-col" class:gap-6={$currentQueueItem}>
	<div
		class="relative flex items-center gap-4"
		class:flex-col={$currentQueueItem?.provider === 'youtube'}>
		<div class="absolute right-0 top-0 hidden items-center space-x-2">
			{#each testColors as color}
				<div class="h-4 w-4 rounded bg-stone-100" style:background={color} />
			{/each}
		</div>
		<div
			class="pointer-events-none w-full"
			style:display={$currentQueueItem?.provider === 'youtube' ? 'block' : 'none'}>
			<div id="yt-player" class="h-auto w-full rounded shadow"></div>
		</div>
		{#if $currentQueueItem}
			{#if $currentQueueItem.provider === 'spotify'}
				<img
					src={$currentQueueItem.artwork}
					alt=""
					class="h-28 w-28 rounded shadow-md shadow-black/5" />
			{/if}
		{:else}
			<!-- <div
				class="flex h-28 w-28 items-center justify-center rounded bg-stone-200 dark:bg-stone-600">
				<span class="text-5xl text-stone-50 drop-shadow dark:text-stone-400">
					<IconMusic />
				</span>
			</div> -->
		{/if}
		<div class="space-y-1">
			{#if $currentQueueItem}
				<div class="cq-name truncate overflow-ellipsis whitespace-nowrap text-lg dark:text-white">
					{$currentQueueItem.name}
				</div>
			{/if}
			{#if $currentQueueItem && $currentQueueItem.artists}
				<div class="text-base text-stone-500 dark:text-stone-400">
					{$currentQueueItem.artists}
				</div>
			{/if}
		</div>
	</div>

	{#if $currentQueueItem}
		<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
			<div
				class="cq-progress-bar h-1.5 rounded-full bg-transparent"
				style:background={$accentColor}
				style:width={percent + '%'} />
		</div>
	{/if}

	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			{#if isHost}
				<PlayerControl />
			{/if}
			<LikeButton />
		</div>

		<VolumeControl />
	</div>
</div>

<style>
	.cq-progress-bar {
		transition: width 1s linear;
	}

	#yt-player {
		min-width: calc(7rem * 16 / 9);
	}

	.cq-name {
		width: calc(480px - 2rem);
	}
</style>

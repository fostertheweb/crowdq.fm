<script lang="ts">
	import { play } from '$lib/player';
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
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import LikeButton from './LikeButton.svelte';
	import PlayerControl from './PlayerControl.svelte';
	import VolumeControl from './VolumeControl.svelte';

	export let isHost = false;

	let progressInterval: ReturnType<typeof setInterval>;
	let testColors: Array<string> = [];
	let playNextIntervalId: ReturnType<typeof setInterval>;
	let trackEnd = false;

	$: duration = $currentQueueItem?.duration || 0;
	$: percent = ($playerPosition / duration) * 100 || 0;

	$: if ($playerStatus === 'playing') {
		clearInterval(progressInterval);
		progressInterval = setInterval(() => {
			$playerPosition = $playerPosition + 1000;
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
		$currentQueueItem = $playQueue.shift() || null;
		$playQueue = $playQueue;
		playNextIntervalId = setInterval(async () => {
			clearInterval(playNextIntervalId);
			trackEnd = false;

			if ($currentQueueItem) {
				await play($currentQueueItem, 0);
			} else {
				$playerStatus = 'idle';
				$playerPosition = 0;
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
								if ($currentQueueItem?.provider === 'youtube') {
									clearInterval(progressInterval);
									$playerPosition = 0;
									$playerStatus = 'loading';
									trackEnd = true;
								}
								break;
							case 1:
								$playerStatus = 'playing';
								break;
							case 2:
								clearInterval(progressInterval);
								$playerStatus = 'paused';
								break;
							default:
								if ($currentQueueItem?.provider === 'youtube') {
									$playerPosition = 0;
									$playerStatus = 'idle';
								}
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
						playerStatus.set('playing');

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

<div class="absolute right-0 top-0 hidden items-center space-x-2">
	{#each testColors as color}
		<div class="h-4 w-4 rounded bg-stone-100" style:background={color} />
	{/each}
</div>

<div class="flex flex-col gap-6">
	<div
		class="pointer-events-none w-full"
		style:display={$currentQueueItem?.provider === 'youtube' ? 'block' : 'none'}>
		<div id="yt-player" class="h-auto w-full rounded shadow"></div>
	</div>

	{#if $currentQueueItem}
		<div
			class="flex flex-col"
			class:gap-4={$currentQueueItem?.provider === 'youtube'}
			class:gap-6={$currentQueueItem?.provider === 'spotify'}
			transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
			{#if $currentQueueItem?.provider === 'youtube'}
				<div class="cq-title truncate overflow-ellipsis whitespace-nowrap text-lg dark:text-white">
					{$currentQueueItem.name}
				</div>
			{:else}
				<div class="relative flex items-center gap-4">
					<img
						src={$currentQueueItem.artwork}
						alt=""
						class="h-28 w-28 rounded shadow-md shadow-black/5" />
					<div class="space-y-1">
						<div
							class="cq-name truncate overflow-ellipsis whitespace-nowrap text-lg dark:text-white">
							{$currentQueueItem.name}
						</div>
						{#if $currentQueueItem.artists}
							<div class="text-base text-stone-500 dark:text-stone-400">
								{$currentQueueItem.artists}
							</div>
						{/if}
					</div>
				</div>
			{/if}
			<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
				<div
					class="cq-progress-bar h-1.5 rounded-full bg-transparent"
					style:background={$accentColor}
					style:width={percent + '%'} />
			</div>
		</div>
	{/if}

	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<PlayerControl {isHost} />
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
		max-width: calc(480px - 10rem);
	}

	.cq-title {
		max-width: 480px;
	}
</style>

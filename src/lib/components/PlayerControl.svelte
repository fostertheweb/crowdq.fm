<script lang="ts">
	import { lighten } from 'polished';
	import { Spotify } from '$lib/spotify';
	import { accentColor, currentQueueItem, playerStatus } from '$lib/stores/player';
	import { playQueue } from '$lib/stores/queue';
	import { spotifyDevice } from '$lib/stores/spotify';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import IconPause from '$lib/components/icons/IconPause.svelte';

	async function playNextTrack() {
		// TODO: send socket event instead
		let nextIndex = 0;
		if ($currentQueueItem) {
			nextIndex = $playQueue.indexOf($currentQueueItem) + 1;
		}
		const nextItem = $playQueue[nextIndex];
		$currentQueueItem = nextItem;

		if ($spotifyDevice) {
			await Spotify.player.startResumePlayback($spotifyDevice, undefined, [
				'spotify:track:' + nextItem.providerId
			]);
		}
	}

	async function pause() {
		if ($spotifyDevice) {
			await Spotify.player.pausePlayback($spotifyDevice);
		}
	}
</script>

{#if $playerStatus === 'playing'}
	<button
		on:click={pause}
		style={`--hover-bg:${lighten(0.25, $accentColor)};`}
		class="cq-pause flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPause />
	</button>
{:else if $playerStatus === 'loading'}
	<button
		disabled
		style={`--hover-bg:${lighten(0.25, $accentColor)};`}
		class="cq-pause flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPause />
	</button>
{:else}
	<button
		on:click={playNextTrack}
		class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-orange-800 hover:bg-orange-300 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
		style:background-color={lighten(0.3, $accentColor)}
		style:color={$accentColor}>
		<IconPlay />
	</button>
{/if}

<style>
	.cq-pause:hover {
		background-color: var(--hover-bg) !important;
	}
</style>

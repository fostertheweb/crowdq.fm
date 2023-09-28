<script lang="ts">
	import { lighten } from 'polished';
	import { Spotify } from '$lib/spotify';
	import { accentColor, currentQueueItem, playerStatus } from '$lib/stores/player';
	import { playQueue } from '$lib/stores/queue';
	import { spotifyDevice } from '$lib/stores/spotify';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';
	import IconPause from '$lib/components/icons/IconPause.svelte';

	async function playNextTrack() {
		let nextIndex = 0;
		if ($currentQueueItem) {
			nextIndex = $playQueue.indexOf($currentQueueItem) + 1;
		}
		const nextItem = $playQueue[nextIndex];
		console.log(nextItem);
		$currentQueueItem = nextItem;

		if ($spotifyDevice) {
			await Spotify.player.startResumePlayback($spotifyDevice, undefined, [
				'spotify:track:' + nextItem.providerId
			]);
		}
	}
</script>

{#if $playerStatus === 'playing'}
	<button
		on:click={() => console.log('pause')}
		class="h-10 w-10 rounded-full bg-orange-200 text-orange-800 hover:brightness-90 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
		style:background-color={lighten(0.4, $accentColor)}
		style:color={$accentColor}
	>
		<IconPause />
	</button>
{:else}
	<button
		on:click={playNextTrack}
		class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-orange-800 hover:brightness-90 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
	>
		<IconPlay />
	</button>
{/if}

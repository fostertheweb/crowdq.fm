<script lang="ts">
	import { lighten } from 'polished';
	import { Spotify } from '$lib/spotify';
	import { accentColor, currentQueueItem, playerStatus } from '$lib/stores/player';
	import { playQueue } from '$lib/stores/queue';
	import { spotifyDevice } from '$lib/stores/spotify';

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
		style:color={$accentColor}><i class="fa-solid fa-pause fa-lg" /></button
	>
{:else}
	<button
		on:click={playNextTrack}
		class="h-10 w-10 rounded-full bg-orange-200 text-orange-800 hover:bg-orange-300 dark:bg-orange-700 dark:text-orange-300 dark:hover:bg-orange-600"
		><i class="fa-solid fa-play fa-lg -mr-0.5" /></button
	>
{/if}

<script lang="ts">
	import { browser } from '$app/environment';
	import AddToQueueButton from '$lib/components/AddToQueueButton.svelte';
	import PlayInSpotifyButton from '$lib/components/PlayInSpotifyButton.svelte';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import { Spotify } from '$lib/spotify';
	import { currentQueueItem } from '$lib/stores/player';
	import { playQueue, queueEnded } from '$lib/stores/queue';
	import { createQuery } from '@tanstack/svelte-query';

	import type { Device, UserProfile } from '@fostertheweb/spotify-web-sdk';
	import IconListMusic from './icons/IconListMusic.svelte';

	export let isMobile: boolean;
	export let devices: Device[] | undefined;
	export let user: UserProfile | null;

	let queueElement: HTMLDivElement;
	let totalListeningTime = 0;
	let scrollY = 0;
	let playCount = 0;

	$: displayShadow = scrollY > 0;
	$: $currentQueueItem && playCount++;
	$: totalListeningTime = totalListeningTime + ($currentQueueItem?.duration || 0);
	$: playCount > 0 && $playQueue.length === 0 ? queueEnded.set(true) : queueEnded.set(false);

	function formatMillis(millis: number) {
		const hours = Math.floor(millis / 3600000);
		const minutes = Math.floor((millis % 3600000) / 60000);
		const seconds = Math.floor((millis % 60000) / 1000);

		let result = `${seconds} seconds.`;

		if (minutes > 0) {
			result = `${minutes} minutes ${result}`;
		}

		if (hours > 0) {
			result = `${hours} hours ${result}`;
		}

		return result;
	}

	const query = createQuery({
		queryKey: ['devices'],
		queryFn: async () => {
			const response = await Spotify.player.getAvailableDevices();
			return response.devices.filter(({ name }) => name !== 'crowdq.fm');
		},
		initialData: devices,
		refetchOnWindowFocus: 'always',
		enabled: !!user && browser
	});
</script>

<div
	class="cq-shadow-xl z-10 flex items-center justify-between bg-stone-50 pb-6 dark:bg-stone-900"
	class:cq-shadow-xl={displayShadow}>
	<div class="flex items-center gap-2">
		<h2 class=" font-readex-pro text-2xl font-semibold text-stone-600 dark:text-stone-300">
			Queue
		</h2>

		<span
			class="w-10 min-w-fit rounded-full bg-stone-100 px-3 text-center font-readex-pro text-base font-medium leading-8 text-stone-500 dark:bg-stone-700/40 dark:text-stone-400"
			>{$playQueue.length}</span>
	</div>

	{#if !isMobile}
		<AddToQueueButton />
	{:else}
		<PlayInSpotifyButton disabled={!user} devices={$query.data} />
	{/if}
</div>

<div
	bind:this={queueElement}
	class="space-y-2 overflow-y-scroll pb-8"
	on:scroll={() => (scrollY = queueElement.scrollTop)}>
	{#if $playQueue.length > 0}
		{#each $playQueue as item (item.id)}
			<TrackCard {item} />
		{/each}
	{:else}
		<div class=" flex flex-col items-center gap-6 pt-12 text-sm text-stone-300 dark:text-stone-500">
			{#if $queueEnded}
				<IconListMusic lg />
				<div class="text-center">
					<h4 class="font-readex-pro text-base font-medium text-stone-500/80">
						Play queue has ended
					</h4>
					<p class="mt-2 text-stone-400">Continue adding songs to the queue or</p>
					<p class="text-stone-400">save the queue as a playlist and dip</p>
				</div>
				<p class="text-xs text-stone-400">
					Listened to {playCount} songs, for {formatMillis(totalListeningTime)}
				</p>
				<button
					disabled
					class="flex items-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 text-sm text-white hover:text-white hover:brightness-125 disabled:pointer-events-none disabled:opacity-60 disabled:grayscale dark:text-white">
					<IconListMusic />
					<span>Save Playlist</span>
				</button>
			{:else}
				<IconListMusic lg />
				<div class="text-center">
					<!-- TODO: use different message when queue ended -->
					<h4 class="font-readex-pro text-base font-medium text-stone-500/80">
						No songs have been queued
					</h4>
					<p class="mt-2 text-stone-400">Add a song with a copied link or drag</p>
					<p class="text-stone-400">and drop from Spotify or YouTube</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.cq-shadow-xl {
		--tw-shadow-color: rgb(28 25 23 / 0.1);
		--tw-shadow: var(--tw-shadow-colored);
		--tw-shadow-colored: 0 20px 25px -25px var(--tw-shadow-color),
			0 8px 10px -10px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
</style>

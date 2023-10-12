<script lang="ts">
	import { browser } from '$app/environment';
	import { createQuery } from '@tanstack/svelte-query';
	import { Spotify } from '$lib/spotify';
	import { handleDrop } from '$lib/drag-events';
	import { playQueue } from '$lib/stores/queue';
	import { currentQueueItem } from '$lib/stores/player';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import PlayInSpotifyButton from '$lib/components/PlayInSpotifyButton.svelte';
	import AddToQueueButton from '$lib/components/AddToQueueButton.svelte';

	import type { Device, UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';

	export let isMobile: boolean;
	export let devices: Device[] | undefined;
	export let user: UserProfile | null;

	$: currentIndex = $playQueue.indexOf($currentQueueItem!);

	const query = createQuery({
		queryKey: ['devices'],
		queryFn: async () => {
			const response = await Spotify.player.getAvailableDevices();
			return response.devices.filter(({ is_active }) => is_active);
		},
		initialData: devices,
		refetchOnWindowFocus: true,
		enabled: !!user && browser
	});
</script>

<svelte:document on:drop|preventDefault={handleDrop} on:dragover|preventDefault />

<div class="flex items-center justify-between">
	<h2 class="font-general text-2xl font-semibold tracking-wide text-stone-600 dark:text-stone-300">
		Queue
	</h2>

	{#if !isMobile}
		<AddToQueueButton />
	{:else}
		<PlayInSpotifyButton disabled={!user} devices={$query.data} />
	{/if}
</div>

<div class="space-y-2 overflow-y-scroll pb-8">
	{#if $playQueue.length > 0}
		{#each $playQueue.slice(currentIndex + 1) as item}
			<TrackCard {item} />
		{/each}
		<div class="text-center text-xs text-stone-400">
			{$playQueue.length} songs, {$playQueue.reduce((d, t) => d + t.duration, 0)}
		</div>
	{:else}
		<div
			class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-8 text-stone-500 dark:bg-stone-800 dark:text-stone-500">
			<span>No songs in queue</span>
		</div>
	{/if}
</div>

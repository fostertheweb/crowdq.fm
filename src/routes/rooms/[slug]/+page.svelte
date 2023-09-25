<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Spotify, getTracksFromLink } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';
	import TrackCard from '$lib/components/TrackCard.svelte';
	import Player from '$lib/components/Player.svelte';
	import AddTrackDialog from '$lib/components/AddTrackDialog.svelte';
	import ListenerStack from '$lib/components/ListenerStack.svelte';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import HostDetails from '$lib/components/HostDetails.svelte';

	import type { Track, UserProfile } from '@spotify/web-api-ts-sdk';
	import type PartySocket from 'partysocket';
	import { createPartySocket } from '$lib/party.js';

	export let data;
	let user: UserProfile | null = data.user;
	let party: PartySocket;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	function createQueueItems(tracks: Track[]) {
		return tracks.map((track: Track) => ({
			name: track.name,
			album: track.album.name,
			artists: track.artists.map((artist) => artist.name).join(', '),
			artwork: track.album.images[0].url,
			duration: track.duration_ms,
			explicit: track.explicit,
			provider: 'spotify',
			providerId: track.id,
			addedAt: Date.now()
		}));
	}

	onMount(async () => {
		party = createPartySocket($page.params.slug);

		if (!user) {
			user = await Spotify.currentUser.profile();
		}

		const main = document.getElementById('main');

		if (main) {
			main.addEventListener('dragenter', (e) => {
				e.preventDefault();
				// show a toast "Drop anywhere on the screen to add to queue."
			});
			main.addEventListener('dragover', (e) => {
				e.preventDefault();
			});
			main.addEventListener('dragleave', (e) => {
				e.preventDefault();
				// hide toast
			});
			main.addEventListener('drop', async (e) => {
				e.preventDefault();
				// hide toast
				const dropData = e.dataTransfer?.getData('text/plain');

				if (dropData) {
					const tracks = await getTracksFromLink(dropData);
					const items = createQueueItems(tracks);
					$playQueue = [...$playQueue, ...items];
				}
			});
		}

		document.addEventListener('paste', async (e) => {
			const clipboardData = e.clipboardData?.getData('text/plain');

			if (clipboardData) {
				const tracks = await getTracksFromLink(clipboardData);
				const items = createQueueItems(tracks);
				$playQueue = [...$playQueue, ...items];
			}
		});
	});
</script>

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 pb-0 dark:bg-stone-900">
	<div class="cq-container flex w-full flex-col gap-6">
		<header class="flex items-center justify-between">
			<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
				crowdq<span class="text-orange-500">.</span>fm
			</h3>

			{#if user}
				<CurrentUser {user} />
			{:else}
				<button
					class="flex items-center gap-2 rounded-full bg-stone-200 px-4 py-1 font-semibold tracking-wide text-stone-600 dark:bg-stone-700 dark:text-stone-300"
				>
					<i class="fa-solid fa-right-to-bracket" />
					Join</button
				>
			{/if}
		</header>

		<Divider />

		<div class="flex items-center justify-between">
			<!-- TODO: show host controls instead if host == true -->
			<HostDetails />
			<ListenerStack />
		</div>

		<Divider />

		<Player {party} />

		<Divider />

		<div class="flex items-center justify-between">
			<h2
				class="font-general text-2xl font-semibold tracking-wide text-stone-600 dark:text-stone-300"
			>
				Queue
			</h2>
			<button
				use:melt={$trigger}
				class="h-8 w-8 rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
				><i class="fa-regular fa-plus-circle fa-lg" />
			</button>
			<div use:melt={$portalled}>
				{#if $open}
					<AddTrackDialog {title} {content} {description} {overlay} {close} />
				{/if}
			</div>
		</div>

		<div class="space-y-2 overflow-y-scroll pb-8">
			{#each $playQueue as item}
				<TrackCard {item} />
			{/each}
		</div>
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>

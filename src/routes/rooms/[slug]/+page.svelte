<script lang="ts">
	import { onMount } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Spotify, getTracksFromLink, isPlaylistLink, isTrackLink } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';
	import TrackCard from '$lib/components/TrackCard.svelte';
	// import Player from '$lib/components/Player.svelte';
	import AddTrackDialog from '$lib/components/AddTrackDialog.svelte';
	import ListenerStack from '$lib/components/ListenerStack.svelte';
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import CurrentUser from '$lib/components/CurrentUser.svelte';
	import type { Track, UserProfile } from '@spotify/web-api-ts-sdk';

	let user: UserProfile;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	function createQueueItems(tracks: any | any[]) {
		if (!Array.isArray(tracks)) {
			tracks = [tracks];
		}

		return tracks.map((track: Track) => ({
			name: track.name,
			album: track.album.name,
			artists: track.artists.map((artist) => artist.name).join(', '),
			artwork: track.album.images[0].url,
			duration: track.duration_ms,
			explicit: track.explicit,
			provider: 'spotify',
			provider_id: track.id
		}));
	}

	onMount(async () => {
		user = await Spotify.currentUser.profile();

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
				const dropData = e.dataTransfer?.getData('text');

				if (dropData) {
					const tracks = await getTracksFromLink(dropData);
					const items = createQueueItems(tracks);

					if (isPlaylistLink(dropData)) {
						$playQueue = [...$playQueue, ...items];
					}

					if (isTrackLink(dropData)) {
						$playQueue = [...$playQueue, ...items];
					}
				}
			});
		}

		document.addEventListener('paste', async (e) => {
			const clipboardData = e.clipboardData?.getData('text/plain');

			if (clipboardData) {
				const tracks = await getTracksFromLink(clipboardData);
				const items = createQueueItems(tracks);

				if (isPlaylistLink(clipboardData)) {
					$playQueue = [...$playQueue, ...items];
				}

				if (isTrackLink(clipboardData)) {
					$playQueue = [...$playQueue, ...items];
				}
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

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<ListenerAvatar
					listener={{ avatar: 'https://i.scdn.co/image/ab67757000003b82a7e271fc2b2fba63ea9df2b4' }}
					size="md"
				/>
				<div class="space-y-px font-general font-medium tracking-wide dark:text-stone-50">
					<div class="text-sm text-stone-500 dark:text-stone-400">Hosted by</div>
					<div>chipwheel</div>
				</div>
			</div>
			<ListenerStack />
		</div>

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

		<!-- <Player /> -->

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

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

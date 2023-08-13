<script lang="ts">
	import { getTracksFromLink, isPlaylistLink, isTrackLink } from '$lib/spotify';
	import { onMount } from 'svelte';
	import { Avatar, Button, DarkMode, Input, Label, Modal } from 'flowbite-svelte';
	import { token } from '../../../stores/session.js';
	import { playQueue } from '../../../stores/queue.js';
	import TrackCard from '../../../components/TrackCard.svelte';

	export let data;

	token.set(data.access_token);

	let addTrackModal = false;

	onMount(() => {
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

					if (isPlaylistLink(dropData)) {
						$playQueue = [...$playQueue, ...tracks];
					}

					if (isTrackLink(dropData)) {
						$playQueue = [...$playQueue, tracks];
					}
				}
			});
		}

		document.addEventListener('paste', async (e) => {
			const clipboardData = e.clipboardData?.getData('text/plain');

			if (clipboardData) {
				const tracks = await getTracksFromLink(clipboardData);

				if (isPlaylistLink(clipboardData)) {
					$playQueue = [...$playQueue, ...tracks];
				}

				if (isTrackLink(clipboardData)) {
					$playQueue = [...$playQueue, tracks];
				}
			}
		});
	});
</script>

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 dark:bg-stone-900">
	<div class="cq-container flex w-full flex-col gap-6">
		<header class="flex justify-between">
			<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
				crowdq<span class="text-orange-500">.</span>fm
			</h3>

			<button
				class="flex items-center gap-2 rounded-full bg-stone-200 px-4 py-1 font-general font-semibold tracking-wide text-stone-600 dark:bg-stone-700 dark:text-stone-300"
			>
				<i class="fa-solid fa-right-to-bracket" />
				Join</button
			>
		</header>

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<Avatar src="https://i.scdn.co/image/ab67757000003b82a7e271fc2b2fba63ea9df2b4" size="md" />
				<div class="space-y-px font-medium tracking-wide dark:text-white">
					<div class="text-sm text-stone-500 dark:text-stone-400">Hosted by</div>
					<div>chipwheel</div>
				</div>
			</div>
			<div class="flex items-center gap-1">
				<Avatar
					class="dark:border-stone-800"
					src="https://userstock.io/data/wp-content/uploads/2017/07/alex-lambley-205711-300x300.jpg"
					size="sm"
					stacked
				/>
				<Avatar
					class="dark:border-stone-800"
					src="https://userstock.io/data/wp-content/uploads/2020/05/imansyah-muhamad-putera-n4KewLKFOZw-300x300.jpg"
					size="sm"
					stacked
				/>
				<Avatar
					class="dark:border-stone-800"
					src="https://userstock.io/data/wp-content/uploads/2017/09/yingchou-han-241463-300x300.jpg"
					size="sm"
					stacked
				/>
				<Avatar
					class="dark:border-stone-800"
					src="https://userstock.io/data/wp-content/uploads/2017/07/kelly-searle-209751-300x300.jpg"
					size="sm"
					stacked
				/>
				<button
					class="-ml-4 flex h-8 items-center rounded-full bg-stone-700 px-2 text-xs text-stone-300 hover:bg-stone-600"
				>
					+5 Listeners
				</button>
			</div>
		</div>

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

		<div class="flex items-center space-x-4">
			<img
				src="https://i.scdn.co/image/ab67616d0000b2731628026676e2fdff0c0ca2ec"
				alt=""
				class="w-28 rounded"
			/>
			<div class="space-y-1">
				<div class="dark:text-white">Find My Way</div>
				<div class="text-sm text-stone-500 dark:text-stone-400">Tentendo, Annalisa Fernandez</div>
			</div>
		</div>

		<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
			<div class="h-1.5 rounded-full bg-[#db82f1]" style="width: 45%" />
		</div>

		<div class="flex items-center justify-between">
			<div class="space-x-2">
				<button class="rounded-full bg-stone-200 px-2 py-1 dark:bg-stone-700 dark:text-stone-300"
					><i class="fa-regular fa-heart" /></button
				>
				<button class="rounded-full bg-stone-200 px-2 py-1 dark:bg-stone-700 dark:text-stone-300"
					><i class="fa-regular fa-thumbs-down" /></button
				>
			</div>
			<div class="flex items-center space-x-2 rounded-full bg-stone-200 px-1 dark:bg-stone-700">
				<button class="px-2 py-1 text-stone-400"><i class="fa-regular fa-minus" /></button>
				<div class="h-1 w-20 rounded-full bg-stone-300 dark:bg-stone-800" />
				<button class="px-2 py-1 text-stone-400"><i class="fa-regular fa-plus" /></button>
			</div>
		</div>

		<div class="h-px w-full bg-stone-200 bg-opacity-80 dark:bg-stone-800" />

		<div class="flex items-center justify-between">
			<h2
				class="font-general text-2xl font-semibold tracking-wide text-stone-600 dark:text-stone-300"
			>
				Queue
			</h2>
			<button
				on:click={() => (addTrackModal = true)}
				class="flex items-center gap-2 rounded-full bg-stone-200 px-4 py-1 font-general font-semibold tracking-wide text-stone-600 hover:bg-stone-600 dark:bg-stone-700 dark:text-stone-300"
				><i class="fa-solid fa-list-music" />Add
			</button>
			<Modal size="xs" bind:open={addTrackModal} outsideclose>
				<div
					class="flex items-center gap-2 font-general text-xl font-semibold tracking-wide dark:text-stone-50"
				>
					<i class="fa-regular fa-list-music" /> Add to Queue
				</div>
				<form class="flex flex-col gap-4">
					<div class="space-x-2 text-sm dark:text-stone-400">
						<i class="fa-regular fa-info-circle" /><span
							>You can drag and drop songs and playlist from Spotify anywhere into the window or
							paste link when crowdq.fm is focused.</span
						>
					</div>
					<Label class="space-y-4">
						<span>YouTube URL, Spotify Track or Playlist Link</span>
						<Input
							type="text"
							name="link"
							placeholder="https://open.spotify.com/track/5MZ46M8kBTyY6BMYFKDVpo?si=2778fff4c44647e3"
						/>
					</Label>
					<div class="flex w-full gap-4">
						<Button class="grow">Cancel</Button>
						<Button color="green" type="submit" class="grow">Add</Button>
					</div>
				</form>
			</Modal>
		</div>

		<div class="space-y-2 pb-8">
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

<script lang="ts">
	import { getTracksFromLink } from '$lib/spotify';
	import { onMount } from 'svelte';
	import { Avatar, Progressbar } from 'flowbite-svelte';
	import { token } from '../../../stores/session.js';

	export let data;

	token.set(data.access_token);

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

					console.log(tracks);
				}
			});
		}

		document.addEventListener('paste', async (e) => {
			const clipboardData = e.clipboardData?.getData('text/plain');

			if (clipboardData) {
				const tracks = await getTracksFromLink(clipboardData);

				console.log(tracks);
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
		</header>

		<div class="flex items-center space-x-4">
			<img
				src="https://i.scdn.co/image/ab67616d0000b2731628026676e2fdff0c0ca2ec"
				alt=""
				class="w-20 rounded"
			/>
			<div class="space-y-1">
				<div>Find My Way</div>
				<div class="text-sm text-stone-500 dark:text-stone-400">Tentendo, Annalisa Fernandez</div>
			</div>
		</div>

		<Progressbar progress="50" color="yellow" size="h-1.5" />

		<div class="flex items-center space-x-4">
			<Avatar src="https://i.scdn.co/image/ab67757000003b82a7e271fc2b2fba63ea9df2b4" size="md" />
			<div class="space-y-1 font-medium dark:text-white">
				<div>chipwheel</div>
				<div class="text-sm text-stone-500 dark:text-stone-400">Hosting this shit</div>
			</div>
		</div>

		<div>
			<h2 class="font-general text-2xl font-semibold tracking-wide text-stone-600">Queue</h2>
			<div />
		</div>
	</div>
</main>

<style>
	.cq-container {
		max-width: 480px;
	}
</style>

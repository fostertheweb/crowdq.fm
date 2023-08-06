<script lang="ts">
	import { getTracksFromLink } from '$lib/spotify';
	import { onMount } from 'svelte';
	import { Avatar } from 'flowbite-svelte';

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
			main.addEventListener('drop', (e) => {
				e.preventDefault();
				// hide toast
				const data = e.dataTransfer?.getData('text');

				if (data) {
					const tracks = getTracksFromLink(data)
						.then((response) => response.json())
						.then((yo) => console.log(yo));
				}
			});
		}

		document.addEventListener('paste', (e) => {
			const data = e.clipboardData?.getData('text/plain');

			if (data) {
				const tracks = getTracksFromLink(data)
					.then((response) => response.json())
					.then((yo) => console.log(yo));
			}
		});
	});
</script>

<main id="main" class="flex h-screen justify-center bg-stone-50 p-8 dark:bg-stone-900">
	<header>
		<div class="flex items-center space-x-4">
			<Avatar
				src="https://i.scdn.co/image/ab67757000003b82a7e271fc2b2fba63ea9df2b4"
				rounded
				size="xs"
			/>
			<div class="space-y-1 font-medium dark:text-white">
				<div>chipwheel</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Hosting this shit</div>
			</div>
		</div>
	</header>

	<footer
		class="fixed bottom-0 flex w-full items-center justify-between border-t border-stone-200 bg-stone-100 p-4 dark:border-stone-700 dark:bg-stone-800"
	>
		<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>
		<div class="text-sm tracking-wide text-stone-500 dark:text-stone-200">
			Made with <span class="text-red-500">&hearts;</span> in Sarasota
		</div>
	</footer>
</main>

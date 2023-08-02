<script lang="ts">
	import { getTracksFromLink } from '$lib/spotify';
	import { onMount } from 'svelte';

	onMount(() => {
		const main = document.getElementById('main');

		if (main) {
			main.addEventListener('dragenter', (e) => {
				e.preventDefault();
			});
			main.addEventListener('dragover', (e) => {
				e.preventDefault();
			});
			main.addEventListener('drop', (e) => {
				e.preventDefault();
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
	<div id="overlay" class="fixed hidden h-screen w-screen bg-stone-900 bg-opacity-20">
		<div class="z-10 h-1/2 w-1/2 rounded-lg border-2 border-dashed border-stone-50" />
	</div>

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

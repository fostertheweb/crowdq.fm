<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('paste', (e) => {
			console.log(e.clipboardData?.getData('text/plain'));
		});
	});
</script>

<main class="flex h-screen justify-center bg-stone-50 p-8 dark:bg-stone-900">
	<footer
		class="fixed bottom-0 flex w-full items-center justify-between border-t border-stone-200 bg-stone-100 p-4 dark:border-stone-700 dark:bg-stone-800"
	>
		<h3 class="font-straker text-2xl tracking-wider text-stone-700 dark:text-stone-50">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>
		<div class="text-sm tracking-wide text-stone-500 dark:text-stone-200">
			made with <span class="text-red-500">&hearts;</span> in Sarasota
		</div>
	</footer>
</main>

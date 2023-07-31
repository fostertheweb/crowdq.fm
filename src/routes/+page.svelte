<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('paste', (e) => {
			console.log(e.clipboardData?.getData('text/plain'));
		});
	});
</script>

<main class="flex justify-center p-8 bg-stone-50 dark:bg-stone-900 h-screen">
	<footer
		class="w-full justify-between bg-stone-800 border-t border-stone-700 fixed items-center bottom-0 p-4 flex"
	>
		<h3 class="text-2xl text-stone-50 font-straker tracking-wider">
			crowdq<span class="text-orange-500">.</span>fm
		</h3>
		<div class="text-sm tracking-wide text-stone-200">
			made with <span class="text-red-500">&hearts;</span> in Sarasota
		</div>
	</footer>
</main>

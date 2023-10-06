<script lang="ts">
	import { browser } from '$app/environment';
	import IconShare from '$lib/components/icons/IconShare.svelte';

	async function share() {
		if (browser) {
			const url = window.location.toString();

			if (navigator.share) {
				await navigator.share({ text: url });
			} else {
				await window.navigator.clipboard.writeText(url);
				// TODO: show toast to confirm copied
			}
		}
	}
</script>

<button
	on:click={share}
	class="flex h-8 w-8 items-center justify-center gap-2 rounded-full bg-stone-200/60 text-sm text-stone-500 hover:bg-stone-200 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
	><IconShare /></button>

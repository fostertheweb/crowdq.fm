<script lang="ts">
	import IconHeart from '$lib/components/icons/IconHeart.svelte';
	import { accentColor } from '$lib/stores/player';

	let filled = false;
</script>

<button
	on:click={() => (filled = !filled)}
	class="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
	style:color={filled ? $accentColor : null}>
	<IconHeart {filled} />
</button>

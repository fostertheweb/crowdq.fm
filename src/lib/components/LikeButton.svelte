<script lang="ts">
	import { accentColor } from '$lib/stores/player';
	import IconAddLike from './icons/IconAddLike.svelte';
	import IconRemoveLike from './icons/IconRemoveLike.svelte';

	let liked = false;
</script>

<button
	on:click={() => (liked = !liked)}
	class="flex h-10 w-10 items-center justify-center rounded-full text-lg text-stone-500 hover:bg-stone-200/60 hover:text-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-stone-200"
	style:color={liked ? $accentColor : null}>
	{#if liked}
		<IconRemoveLike />
	{:else}
		<IconAddLike />
	{/if}
</button>

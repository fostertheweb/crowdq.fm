<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import type { Listener } from '$lib/types';

	export let item: any;
	export let listener: Partial<Listener>;
</script>

<div
	class="group relative flex w-full cursor-pointer items-center gap-4 rounded p-3 text-left text-sm transition ease-in-out hover:bg-stone-100 dark:hover:bg-stone-800">
	<div class="relative shrink-0">
		<img src={item.artwork} class="h-10 w-10 rounded-sm bg-stone-200 shadow" alt="" />
	</div>
	<div class="cq-track-details flex flex-col gap-1">
		<div class="flex items-center gap-2 truncate text-sm text-stone-700 dark:text-stone-200">
			<span>{item.name}</span>
			{#if item.explicit}
				<div
					class="small-caps cq-font-heading flex items-center justify-center rounded-sm bg-stone-200 px-1 py-0 text-xs tracking-wide text-stone-500 dark:bg-stone-600 dark:text-stone-300">
					E
				</div>
			{/if}
		</div>
		<div class="truncate text-xs text-stone-500 dark:text-stone-400">
			{item.artists}
		</div>
	</div>
	<div class="absolute right-2">
		<ListenerAvatar {listener} size="sm" />
	</div>
</div>

<style>
	.cq-track-details {
		width: 85%;
	}
</style>

<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import { listenersTableToCollection, store } from '$lib/db';
	import { listeners } from '$lib/stores/party';
	import { onMount } from 'svelte';

	let tableListenerId: string;
	$: additionalListeners = $listeners.length - 3;

	onMount(async () => {
		tableListenerId = store.addTableListener('listeners', () => {
			$listeners = listenersTableToCollection(store.getTable('listeners'));
		});
	});
</script>

<div class="flex flex-col items-end gap-1">
	<div class="relative flex items-center gap-1 -space-x-4">
		{#if $listeners.length > 0}
			{#each $listeners as listener}
				<ListenerAvatar {listener} bordered />
			{/each}
			{#if additionalListeners > 0}
				<div
					class="flex h-8 items-center justify-center rounded-r-full bg-stone-200 pl-4 pr-3 font-general text-sm font-medium text-stone-500 dark:bg-stone-700 dark:text-stone-400">
					+{additionalListeners}
				</div>
			{/if}
		{:else}
			<div
				class="flex h-8 items-center justify-center text-sm text-stone-500 dark:bg-stone-700 dark:text-stone-400">
				Invite others to listen!
			</div>
		{/if}
	</div>
</div>

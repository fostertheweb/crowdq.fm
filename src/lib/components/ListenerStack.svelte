<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import { listenersTableToCollection, store } from '$lib/db';
	import { listeners } from '$lib/stores/party';
	import { onDestroy, onMount } from 'svelte';

	import type { Listener } from '$lib/types';
	import type { UserProfile } from '@fostertheweb/spotify-web-sdk';

	export let currentUser: UserProfile | null;

	function isNotCurrentUser(listener: Listener) {
		return listener.providerId !== currentUser?.id;
	}

	let tableListenerId: string;
	$: additionalListeners = $listeners.length - 3;
	$: visibleListeners = $listeners.filter(isNotCurrentUser).slice(0, 3);

	onMount(async () => {
		tableListenerId = store.addTableListener('listeners', (_store) => {
			$listeners = listenersTableToCollection(store.getTable('listeners')).filter(isNotCurrentUser);
		});
	});

	onDestroy(() => {
		store.delListener(tableListenerId);
	});
</script>

<div class="flex flex-col items-end gap-1">
	<div class="relative flex items-center gap-1 -space-x-4">
		{#if $listeners.length > 0}
			{#each visibleListeners as listener}
				<ListenerAvatar {listener} bordered />
			{/each}
			{#if additionalListeners > 0}
				<div
					class="flex h-8 items-center justify-center rounded-r-full bg-stone-200/40 pl-4 pr-3 font-readex-pro text-sm font-medium text-stone-500 dark:bg-stone-700/40 dark:text-stone-400">
					+{additionalListeners}
				</div>
			{/if}
		{/if}
	</div>
</div>

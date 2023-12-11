<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import { listeners } from '$lib/stores/party';

	import type { Listener } from '$lib/types';
	import type { UserProfile } from '@fostertheweb/spotify-web-sdk';

	export let currentUser: UserProfile | null;

	function isNotCurrentUser(listener: Listener) {
		return listener.providerId !== currentUser?.id;
	}

	$: additionalListeners = $listeners.length - 5;
	$: visibleListeners = $listeners.filter(isNotCurrentUser).slice(0, 5);
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

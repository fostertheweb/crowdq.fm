<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';
	import type { UserProfile } from '@fostertheweb/spotify-web-api-ts-sdk';

	export let user: UserProfile;
</script>

<div class="flex items-center">
	<ListenerAvatar listener={{ avatar: user.images[0].url }} />
	<div
		class="-ml-4 flex h-8 items-center justify-center rounded-r-full bg-stone-200/40 pl-6 pr-3 font-general text-sm font-medium tracking-wide text-stone-600 dark:bg-stone-700/40 dark:text-stone-400">
		{user.display_name}
	</div>
</div>

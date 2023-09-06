<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';

	import type { PrivateUser } from 'spotify-types';

	export let user: PrivateUser;
</script>

<div class="flex items-center gap-2 rounded bg-stone-100 px-2 py-1">
	<ListenerAvatar listener={{ avatar: user.images[0].url }} size="sm" />
	<span class="font-general text-sm font-medium tracking-wide text-stone-600"
		>{user.display_name}</span
	>
</div>

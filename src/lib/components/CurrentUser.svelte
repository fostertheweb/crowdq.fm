<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';

	import type { PrivateUser } from 'spotify-types';

	export let user: PrivateUser;
</script>

<div class="flex items-center">
	<ListenerAvatar listener={{ avatar: user.images[0].url }} size="sm" />
	<div
		class="-ml-4 flex h-8 items-center justify-center rounded-r bg-stone-100 pl-6 pr-2 font-general text-sm font-medium tracking-wide text-stone-600"
	>
		{user.display_name}
	</div>
</div>

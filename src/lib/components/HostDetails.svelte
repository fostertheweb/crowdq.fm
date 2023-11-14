<script lang="ts">
	import ListenerAvatar from './ListenerAvatar.svelte';

	import type { Room } from '$lib/types';

	export let room: Room;
</script>

<div class="flex items-center space-x-2">
	<ListenerAvatar listener={{ avatar: room.imageUrl }} size="lg" />
	<div class="font-readex-pro space-y-px font-medium tracking-wide dark:text-stone-50">
		<div class="text-sm text-stone-500 dark:text-stone-400">Hosted by</div>
		<div>{room.hostedBy}</div>
	</div>
</div>

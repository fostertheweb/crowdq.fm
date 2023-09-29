<script lang="ts">
	import ListenerAvatar from './ListenerAvatar.svelte';
</script>

<div class="flex items-center space-x-2">
	<ListenerAvatar
		listener={{ avatar: 'https://i.scdn.co/image/ab67757000003b82a7e271fc2b2fba63ea9df2b4' }}
		size="lg" />
	<div class="space-y-px font-general font-medium tracking-wide dark:text-stone-50">
		<div class="text-sm text-stone-500 dark:text-stone-400">Hosted by</div>
		<div>chipwheel</div>
	</div>
</div>

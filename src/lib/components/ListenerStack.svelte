<script lang="ts">
	import ListenerAvatar from './ListenerAvatar.svelte';

	const listeners = [
		{
			avatar: 'https://userstock.io/data/wp-content/uploads/2017/07/alex-lambley-205711-300x300.jpg'
		},
		{
			avatar:
				'https://userstock.io/data/wp-content/uploads/2020/05/imansyah-muhamad-putera-n4KewLKFOZw-300x300.jpg'
		},
		{
			avatar: 'https://userstock.io/data/wp-content/uploads/2017/09/yingchou-han-241463-300x300.jpg'
		}
	];
</script>

<div class="flex flex-col items-end gap-1">
	<div class="relative flex items-center gap-1 -space-x-3">
		{#each listeners as listener}
			<ListenerAvatar {listener} />
		{/each}
		<div class="bg-stone-200/60 dark:bg-stone-700 text-stone-500 dark:text-stone-400 flex pl-3 rounded-l-none pr-2 items-center justify-center text-xs h-8 rounded">+3 Listeners</div>
	</div>
</div>

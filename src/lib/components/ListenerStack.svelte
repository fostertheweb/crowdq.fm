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
	<div class="relative flex items-center gap-1 -space-x-4">
		{#each listeners as listener}
			<ListenerAvatar {listener} />
		{/each}
		<div
			class="flex h-8 items-center justify-center rounded-r bg-stone-100 pl-5 pr-2 text-xs text-stone-500 dark:bg-stone-700 dark:text-stone-400"
		>
			+3 Listeners
		</div>
	</div>
</div>

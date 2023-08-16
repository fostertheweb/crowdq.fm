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
		},
		{
			avatar: 'https://userstock.io/data/wp-content/uploads/2017/07/kelly-searle-209751-300x300.jpg'
		}
	];
</script>

<div class="flex items-center gap-1 -space-x-4">
	{#each listeners as listener}
		<ListenerAvatar {listener} />
	{/each}
	<button
		class="-ml-4 flex h-8 items-center rounded-full bg-stone-200 px-2 text-xs hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
	>
		+5 Listeners
	</button>
</div>

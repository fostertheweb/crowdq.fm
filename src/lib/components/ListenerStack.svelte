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
		},
		{
			avatar: 'https://pbs.twimg.com/profile_images/1605762947686375425/lsoGWWty_400x400.jpg'
		}
	];
</script>

<div class="flex flex-col items-end gap-1">
	<div class="relative flex items-center gap-1 -space-x-3">
		{#each listeners as listener}
			<ListenerAvatar {listener} />
		{/each}
	</div>
	<span class="text-xs dark:text-stone-400">+7 Listeners</span>
</div>

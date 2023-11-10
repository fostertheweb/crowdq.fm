<script lang="ts">
	import ListenerAvatar from '$lib/components/ListenerAvatar.svelte';

	let listeners = [
		{
			avatar: 'https://userstock.io/data/wp-content/uploads/2017/09/yingchou-han-261533-300x300.jpg'
		},
		{
			avatar:
				'https://userstock.io/data/wp-content/uploads/2017/07/william-stitt-111007-300x300.jpg'
		},
		{
			avatar:
				'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-26939-1-300x300.jpg'
		},
		{
			avatar: 'https://userstock.io/data/wp-content/uploads/2017/07/ahmed-saffu-201122-300x300.jpg'
		}
	];
</script>

<div class="flex flex-col items-start gap-1">
	<div class="relative flex items-center gap-1 -space-x-4">
		{#each listeners as listener}
			<ListenerAvatar {listener} bordered />
		{/each}
	</div>
</div>

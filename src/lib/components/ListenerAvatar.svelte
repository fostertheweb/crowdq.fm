<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';

	export let listener;
	export let size = 'sm';

	const sizeClass = size === 'md' ? 'h-12 w-12' : 'h-8 w-8';

	const {
		elements: { image, fallback }
	} = createAvatar({
		src: listener.avatar
	});
</script>

<div
	class="flex {sizeClass} items-center justify-center rounded-full border border-stone-50 bg-stone-100 dark:border-stone-600 dark:bg-stone-500"
>
	<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
	<span use:melt={$fallback} class="font-medium text-stone-700">RH</span>
</div>

<script lang="ts">
	import type { Listener } from '$lib/types';
	import { createAvatar, melt } from '@melt-ui/svelte';

	export let listener: Partial<Listener>;
	export let size = 'md';
	export let bordered = false;

	const sizes: { [key: string]: string } = {
		lg: 'h-10 w-10',
		md: 'h-8 w-8',
		sm: 'h-6 w-6'
	};

	const border = bordered ? 'border border-stone-50 dark:border-stone-600' : '';

	const initials = listener.displayName
		?.split(' ')
		.map((s) => s[0])
		.join('');

	const {
		elements: { image, fallback }
	} = createAvatar({
		src: listener.avatar!
	});
</script>

<div
	class="flex {sizes[
		size
	]} {border} z-20 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-500">
	<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
	<span use:melt={$fallback} class="font-medium text-stone-700">{initials || '?'}</span>
</div>

<script lang="ts">
	import type { Listener } from '$lib/types';
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { readableColor } from 'polished';
	import randomColor from 'randomcolor';

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

	const bgColor = randomColor({ seed: listener.displayName });
</script>

<div
	class="flex {sizes[
		size
	]} {border} z-20 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-500"
	style:background-color={bgColor}>
	<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
	<span
		use:melt={$fallback}
		class="font-medium text-stone-700"
		style:color={readableColor(bgColor)}>
		{initials || '?'}
	</span>
</div>

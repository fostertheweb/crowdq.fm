<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Listener } from '$lib/types';
	import { Avatar } from 'bits-ui';

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

	const initials = listener.displayName
		?.split(' ')
		.map((s) => s[0])
		.join('');

	const bgColor = randomColor({ seed: listener.displayName });
</script>

<Avatar.Root
	class={cn(
		'z-20 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-50',
		bordered && 'border border-stone-50 dark:border-stone-600',
		sizes[size],
		`bg-[${bgColor}]`
	)}>
	<Avatar.Image
		class="h-full w-full rounded-[inherit]"
		src={listener.avatar}
		alt={listener.displayName} />
	<Avatar.Fallback class={`font-medium text-stone-700 text-[${readableColor(bgColor)}]`}>
		{initials || '?'}
	</Avatar.Fallback>
</Avatar.Root>

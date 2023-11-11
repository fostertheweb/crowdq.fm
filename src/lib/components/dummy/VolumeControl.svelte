<script lang="ts">
	import IconMinus from '$lib/components/icons/IconMinus.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { createSlider, melt } from '@melt-ui/svelte';

	const {
		elements: { root, range, thumb }
	} = createSlider({
		disabled: true,
		defaultValue: [30],
		max: 100
	});
</script>

<div class="flex items-center space-x-2 rounded-full bg-white/50 px-1 dark:bg-white/20">
	<button class="p-2 text-stone-400"><IconMinus /></button>

	<span use:melt={$root} class="relative flex w-24 items-center">
		<span class="block h-1 w-full rounded-full bg-stone-300">
			<span use:melt={$range} class="h-1 rounded-full bg-stone-400" />
		</span>
		<span use:melt={$thumb()} class="block h-4 w-4 rounded-full bg-white shadow outline-none" />
	</span>
	<button class="px-2 py-1 text-stone-400">
		<IconPlus />
	</button>
</div>

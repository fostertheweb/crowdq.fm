<script lang="ts">
	import IconMinus from '$lib/components/icons/IconMinus.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { UniversalPlayer } from '$lib/player';
	import { createSlider, melt } from '@melt-ui/svelte';

	const {
		elements: { root, range, thumb },
		states
	} = createSlider({
		defaultValue: [25],
		onValueChange({ next }) {
			UniversalPlayer.setVolume(next[0]);
			return next;
		},
		min: 0,
		max: 100
	});
</script>

<div class="flex items-center space-x-2 rounded-full bg-stone-200/60 px-1 dark:bg-stone-700">
	<button
		class="px-2 py-2.5 text-stone-400 hover:text-stone-500 dark:hover:text-stone-300"
		on:click={() => states.value.update((current) => [current[0] - 1])}><IconMinus /></button>

	<span use:melt={$root} class="relative flex w-24 items-center">
		<span class="block h-1 w-full rounded-full bg-stone-300">
			<span use:melt={$range} class="h-1 rounded-full bg-stone-400" />
		</span>
		<span
			use:melt={$thumb()}
			class="block h-4 w-4 rounded-full bg-white shadow outline-none focus:ring-4 focus:ring-black/40" />
	</span>
	<button
		on:click={() => states.value.update((current) => [current[0] + 1])}
		class="px-2 py-2.5 text-stone-400 hover:text-stone-500 dark:hover:text-stone-300">
		<IconPlus />
	</button>
</div>

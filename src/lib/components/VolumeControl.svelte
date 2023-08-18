<script lang="ts">
	import { createSlider, melt } from '@melt-ui/svelte';

	const {
		elements: { root, range, thumb }
	} = createSlider({
		defaultValue: [30],
		max: 100
	});
</script>

<div class="flex items-center space-x-2 rounded-full bg-stone-200 px-1 dark:bg-stone-700">
	<button class="px-2 py-1 text-stone-400 hover:text-stone-500"
		><i class="fa-solid fa-minus" /></button
	>

	<span use:melt={$root} class="relative flex w-24 items-center">
		<span class="block h-1 w-full rounded-full bg-stone-300">
			<span use:melt={$range} class="h-1 rounded-full bg-stone-400" />
		</span>
		<span
			use:melt={$thumb()}
			class="block h-4 w-4 rounded-full bg-stone-400 outline-none focus:ring-4 focus:ring-black/40"
		/>
	</span>
	<button class="px-2 py-1 text-stone-400 hover:text-stone-500"
		><i class="fa-solid fa-plus" /></button
	>
</div>

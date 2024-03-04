<script lang="ts">
	import IconMinus from '$lib/components/icons/IconMinus.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { Slider } from 'bits-ui';

	let value = [30];
</script>

<div class="flex items-center space-x-2 rounded-full bg-white/50 px-1 dark:bg-white/20">
	<button class="cursor-default p-2 text-stone-400 dark:text-white/70"><IconMinus /></button>

	<Slider.Root disabled bind:value let:thumbs class="relative flex w-24 items-center">
		<span class="block h-1 w-full rounded-full bg-stone-300">
			<Slider.Range class="h-1 rounded-full bg-stone-400" />
		</span>
		{#each thumbs as thumb}
			<Slider.Thumb {thumb} class="block h-4 w-4 rounded-full bg-white shadow outline-none" />
		{/each}
	</Slider.Root>

	<button class="cursor-default px-2 py-1 text-stone-400 dark:text-white/70">
		<IconPlus />
	</button>
</div>

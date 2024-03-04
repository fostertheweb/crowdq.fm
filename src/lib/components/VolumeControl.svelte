<script lang="ts">
	import { Slider } from 'bits-ui';
	import IconMinus from '$lib/components/icons/IconMinus.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import { setVolume } from '$lib/player';

	let value = [25];

	function handleValueChange(next: number[]) {
		setVolume(next[0]);
		return next;
	}
</script>

<div class="flex items-center space-x-2 rounded-full bg-stone-200/60 px-1 dark:bg-stone-700">
	<button
		class="px-2 py-2.5 text-stone-400 hover:text-stone-500 dark:hover:text-stone-300"
		on:click={() => (value = [value[0] - 1])}><IconMinus /></button>

	<Slider.Root
		bind:value
		let:thumbs
		min={0}
		max={100}
		onValueChange={handleValueChange}
		class="relative flex w-24 items-center">
		<span class="block h-1 w-full rounded-full bg-stone-300">
			<Slider.Range class="h-1 rounded-full bg-stone-400" />
		</span>
		{#each thumbs as thumb}
			<Slider.Thumb
				{thumb}
				class="block h-4 w-4 rounded-full bg-white shadow outline-none focus:ring-4 focus:ring-black/40" />
		{/each}
	</Slider.Root>

	<button
		on:click={() => (value = [value[0] + 1])}
		class="px-2 py-2.5 text-stone-400 hover:text-stone-500 dark:hover:text-stone-300">
		<IconPlus />
	</button>
</div>

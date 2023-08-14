<script lang="ts">
	import { Range } from 'flowbite-svelte';
</script>

<div class="flex items-center space-x-4">
	<img
		src="https://i.scdn.co/image/ab67616d0000b2731628026676e2fdff0c0ca2ec"
		alt=""
		class="w-28 rounded"
	/>
	<div class="space-y-1">
		<div class="text-lg dark:text-white">Find My Way</div>
		<div class="text-base text-stone-500 dark:text-stone-400">Tentendo, Annalisa Fernandez</div>
	</div>
</div>

<div class="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-700">
	<div class="h-1.5 rounded-full bg-[#db82f1]" style="width: 45%" />
</div>

<div class="flex items-center justify-between">
	<div class="space-x-2">
		<button class="rounded-full bg-stone-200 px-2 py-1 dark:bg-stone-700 dark:text-stone-300"
			><i class="fa-regular fa-heart" /></button
		>
		<button class="rounded-full bg-stone-200 px-2 py-1 dark:bg-stone-700 dark:text-stone-300"
			><i class="fa-regular fa-thumbs-down" /></button
		>
	</div>
	<div class="flex items-center space-x-2 rounded-full bg-stone-200 px-1 dark:bg-stone-700">
		<button class="px-2 py-1 text-stone-400"><i class="fa-regular fa-minus" /></button>
		<Range id="volume" value={25} />
		<button class="px-2 py-1 text-stone-400"><i class="fa-regular fa-plus" /></button>
	</div>
</div>

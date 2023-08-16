<script lang="ts">
	export let item;

	let imageUrl = item.album?.images[2]?.url;

	function millisToMinutesAndSeconds(millis: number) {
		var minutes = Math.floor(millis / 60000);
		var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
		return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
	}
</script>

<div
	class="group relative flex w-full cursor-pointer items-center gap-4 rounded p-3 text-left text-sm transition ease-in-out hover:bg-stone-100 dark:hover:bg-stone-800"
>
	<div class="relative shrink-0">
		{#if imageUrl}
			<img src={imageUrl} class="h-14 w-14 rounded bg-stone-200 shadow" alt="" />
		{:else}
			<div>Loading...</div>
		{/if}
	</div>
	<div class="cq-track-details flex flex-col gap-2">
		<div class="flex items-center gap-2 truncate text-base text-stone-700 dark:text-stone-200">
			<span>{item.name}</span>
			{#if item.explicit}
				<div
					class="small-caps cq-font-heading flex items-center justify-center rounded-sm bg-stone-200 px-1 py-0 text-xs tracking-wide text-stone-500 dark:bg-stone-600 dark:text-stone-300"
				>
					E
				</div>
			{/if}
		</div>
		<div class="truncate text-sm text-stone-500 dark:text-stone-400">
			{item.artists.map((artist) => artist.name).join(', ')}
		</div>
	</div>
	<div
		class="absolute right-2 rounded bg-stone-200 p-1 text-stone-400 opacity-0 transition ease-in-out group-hover:opacity-100 dark:bg-stone-900"
	>
		{millisToMinutesAndSeconds(item.duration_ms)}
	</div>
</div>

<style>
	.cq-track-details {
		width: 85%;
	}
</style>

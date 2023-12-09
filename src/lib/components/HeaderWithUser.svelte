<script lang="ts">
	export let name: string | undefined;
	export let image: string | undefined;
</script>

<header
	class="z-20 flex w-full items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-600">
	<div class="flex items-center gap-12">
		<div class="flex items-center gap-2">
			<h3
				class="font-straker text-2xl font-medium tracking-wide text-stone-700 dark:text-stone-200">
				crowdq<span class="text-jake-500">.</span>fm
			</h3>
		</div>
	</div>
	{#if name}
		<div
			class="cq-font-heading flex items-center gap-2 font-semibold text-stone-600 dark:text-white">
			{#if image}
				<img src={image} alt="" class="h-8 w-8 rounded-full" />
			{:else}
				<i class="fa-brands fa-spotify fa-lg fill-current text-[#1cd760]" />
			{/if}
		</div>
	{/if}
</header>

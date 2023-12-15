<script lang="ts">
	import IconDevice from '../icons/IconDevice.svelte';
	import IconExternalLink from '../icons/IconExternalLink.svelte';
	import IconPlus from '../icons/IconPlus.svelte';
	import IconSpinner from '../icons/IconSpinner.svelte';

	let shouldOpenSpotify = false;
	let isAdding = false;
</script>

<div class="rounded bg-white p-6 pt-2 shadow dark:bg-stone-700">
	<h3
		class="m-0 text-center font-readex-pro text-base font-medium text-stone-500 dark:text-stone-300">
		Select Spotify Device
	</h3>
	<div class="h-4" />

	<div
		class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
		aria-label="Select device">
		<div class="flex gap-4">
			<div
				class="flex w-1/3 flex-col items-center justify-center gap-2 rounded border-2 border-stone-200 bg-stone-50 p-2 text-stone-700 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-300">
				<IconDevice deviceType="computer" />
				Laptop
			</div>
			<div
				class="flex w-1/3 flex-col items-center justify-center gap-2 rounded border-2 border-jake-500 bg-jake-50 p-2 text-jake-900 dark:border-jake-400 dark:bg-jake-200">
				<IconDevice deviceType="smartphone" />
				iPhone
			</div>
			<div
				class="flex w-1/3 flex-col items-center justify-center gap-2 rounded border-2 border-stone-200 bg-stone-50 p-2 text-stone-700 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-300">
				<IconDevice deviceType="tv" />
				Television
			</div>
		</div>

		<div class="mt-2 flex justify-end gap-3 font-readex-pro font-medium">
			<div
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 dark:border-stone-500 dark:bg-stone-500 dark:text-stone-200">
				Cancel
			</div>
			{#if shouldOpenSpotify}
				<a
					href="spotify://"
					class="inline-flex items-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 font-readex-pro font-medium text-black"
					><IconExternalLink />Open Spotify</a>
			{:else}
				<div
					class="inline-flex items-center justify-center gap-1 rounded-full
                    bg-jake-200 px-4 py-3 font-medium leading-none text-jake-950">
					{#if isAdding}
						<IconSpinner />
					{:else}
						<IconPlus />
					{/if}

					{#if isAdding}
						<span>Adding</span>
					{:else}
						<span>Add</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

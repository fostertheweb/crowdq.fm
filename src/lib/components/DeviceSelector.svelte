<script lang="ts">
	import IconCheck from '$lib/components/icons/IconCheck.svelte';
	import IconDevice from '$lib/components/icons/IconDevice.svelte';
	import IconExternalLink from '$lib/components/icons/IconExternalLink.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import IconQuestion from '$lib/components/icons/IconQuestion.svelte';
	import IconSpinner from '$lib/components/icons/IconSpinner.svelte';
	import type { Device } from '@fostertheweb/spotify-web-sdk';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import clsx from 'clsx';

	export let devices: Array<Device> | undefined;
	export let isAdding = false;
	export let shouldOpenSpotify = false;
	export let addToQueue: (deviceId: string) => void;
	export let cancel: () => void;

	const {
		elements: { root, item },
		helpers: { isChecked },
		states: { value }
	} = createRadioGroup({
		defaultValue: 'default'
	});
</script>

<div
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
	aria-label="Select device">
	{#if !devices || devices.length === 0}
		<div
			class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-2 dark:bg-stone-700 dark:text-stone-400">
			<div>
				<p>No active devices found. Open Spotify and come back.</p>
			</div>
		</div>
		<div class="mt-2 flex justify-end gap-3 font-readex-pro font-medium">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			<a
				href="spotify://"
				class="inline-flex items-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 font-readex-pro font-medium text-black"
				><IconExternalLink />Open Spotify</a>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each devices as device}
				{#if device.id}
					<button class="flex w-full items-center gap-4" use:melt={$item(device.id)} id={device.id}>
						<div
							class={clsx(
								'flex h-4 w-4 items-center justify-center rounded-full border ',
								!$isChecked(device.id) &&
									'border-stone-300 bg-stone-200 text-stone-200 dark:border-stone-500 dark:bg-stone-600 dark:text-stone-600',
								$isChecked(device.id) &&
									'border-jake-500 bg-jake-400 text-white dark:border-jake-400 dark:bg-jake-500'
							)}>
							<IconCheck />
						</div>
						<div
							class={clsx(
								'flex items-center gap-2 font-readex-pro text-lg',
								$isChecked(device.id) && 'text-jake-700 dark:text-jake-400',
								$isChecked(device.id) && 'text-stone-700 dark:text-stone-300'
							)}>
							<IconDevice deviceType={device.type} />
							{device.name}
						</div>
					</button>
				{/if}
			{/each}
		</div>

		<div class=" mt-2 flex items-center gap-2 text-stone-400">
			<IconQuestion />
			<p class="text-sm">Device missing? Open Spotify and come back.</p>
		</div>

		<div class="mt-2 flex justify-end gap-3 font-readex-pro font-medium sm:flex-row">
			<button
				on:click={() => cancel()}
				class="inline-flex w-1/2 items-center justify-center rounded-full border
                    border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200/60 dark:border-stone-500/30 dark:bg-stone-600 dark:text-stone-200 dark:hover:bg-stone-500/60 sm:w-fit">
				Cancel
			</button>
			{#if shouldOpenSpotify}
				<a
					href="spotify://"
					class="inline-flex w-1/2 items-center justify-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 font-readex-pro font-medium text-black sm:w-fit"
					><IconExternalLink />Open Spotify</a>
			{:else}
				<button
					on:click={() => addToQueue($value)}
					class="inline-flex w-1/2 items-center justify-center gap-1 rounded-full border border-jake-500/40 bg-jake-400 px-4 py-3 font-semibold leading-none text-white
                    hover:bg-jake-500 dark:bg-jake-600 dark:text-jake-50 dark:hover:bg-jake-600 dark:hover:brightness-105 sm:w-fit">
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
				</button>
			{/if}
		</div>
	{/if}
</div>

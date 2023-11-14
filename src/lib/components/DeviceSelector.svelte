<script lang="ts">
	import IconDevice from '$lib/components/icons/IconDevice.svelte';
	import IconExternalLink from '$lib/components/icons/IconExternalLink.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import IconSpinner from '$lib/components/icons/IconSpinner.svelte';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import IconInfo from './icons/IconInfo.svelte';

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
		<div class="font-readex-pro mt-2 flex justify-end gap-3 font-medium tracking-wide">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			<a
				href="spotify://"
				class="font-readex-pro inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 font-medium text-white"
				><IconExternalLink />Open Spotify</a>
		</div>
	{:else}
		<div class="flex gap-4">
			{#each devices as device}
				{#if device.id}
					<button
						use:melt={$item(device.id)}
						class="flex w-1/3 flex-col items-center justify-center gap-2 rounded border-2 p-2 {$isChecked(
							device.id
						)
							? 'border-green-500 bg-green-50 text-green-900 ring-0 ring-green-50'
							: 'bg-stone-50 ring-stone-200'}"
						id={device.id}>
						<IconDevice deviceType={device.type} />
						{device.name}
					</button>
				{/if}
			{/each}
		</div>

		<div
			class="flex items-baseline justify-center gap-2 text-sm text-stone-600 dark:text-stone-400">
			<span class="text-base"><IconInfo /></span>
			<p class="leading-6">Don't see your device? Open Spotify and come back.</p>
		</div>

		<div class="font-readex-pro mt-2 flex justify-end gap-3 font-medium tracking-wide">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			{#if shouldOpenSpotify}
				<a
					href="spotify://"
					class="font-readex-pro inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 font-medium text-white"
					><IconExternalLink />Open Spotify</a>
			{:else}
				<button
					on:click={() => addToQueue($value)}
					class="inline-flex items-center justify-center gap-1 rounded-full
                    bg-orange-300 px-4 py-3 font-medium leading-none text-orange-900 hover:bg-orange-400">
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

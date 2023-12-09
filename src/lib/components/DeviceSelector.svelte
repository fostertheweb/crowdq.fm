<script lang="ts">
	import IconDevice from '$lib/components/icons/IconDevice.svelte';
	import IconExternalLink from '$lib/components/icons/IconExternalLink.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import IconQuestion from '$lib/components/icons/IconQuestion.svelte';
	import IconSpinner from '$lib/components/icons/IconSpinner.svelte';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import { createRadioGroup, melt } from '@melt-ui/svelte';

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
				class="inline-flex items-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 font-readex-pro font-medium text-white"
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
							? 'border-jake-500 bg-jake-50 text-jake-900 ring-jake-50 ring-0'
							: 'bg-stone-50 ring-stone-200'}"
						id={device.id}>
						<IconDevice deviceType={device.type} />
						{device.name}
					</button>
				{/if}
			{/each}
		</div>

		<div class=" mt-2 flex items-center gap-2 text-stone-400">
			<IconQuestion />
			<p class="text-sm">Don't see your device? Open Spotify and come back.</p>
		</div>

		<div
			class="mt-2 flex flex-col-reverse justify-end gap-3 font-readex-pro font-medium sm:flex-row">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			{#if shouldOpenSpotify}
				<a
					href="spotify://"
					class="inline-flex items-center justify-center gap-2 rounded-full bg-[#1cd760] px-3 py-2 font-readex-pro font-medium text-white"
					><IconExternalLink />Open Spotify</a>
			{:else}
				<button
					on:click={() => addToQueue($value)}
					class="bg-jake-300 text-jake-900 hover:bg-jake-400 inline-flex items-center
                    justify-center gap-1 rounded-full px-4 py-3 font-medium leading-none">
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

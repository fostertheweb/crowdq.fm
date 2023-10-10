<script lang="ts">
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import IconDevice from '$lib/components/icons/IconDevice.svelte';
	import IconPlus from '$lib/components/icons/IconPlus.svelte';
	import IconExternalLink from '$lib/components/icons/IconExternalLink.svelte';

	export let devices: Array<Device> | undefined;
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
			class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-4 dark:bg-stone-700 dark:text-stone-400">
			<div>
				<p>No active devices found. Open the Spotify app and return to crowdq.fm</p>
				<p class="mt-4">You might have to play music in the app for the device to show up here.</p>
			</div>
		</div>
		<div class="mt-2 flex justify-end gap-3 font-general font-medium tracking-wide">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			<a
				href="spotify://"
				class="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 font-general font-medium text-white"
				><IconExternalLink />Open Spotify</a>
		</div>
	{:else}
		{#each devices as device}
			{#if device.id}
				<button
					use:melt={$item(device.id)}
					class="flex items-center justify-center gap-2 rounded border p-3 shadow {$isChecked(
						device.id
					)
						? 'border-green-500 bg-green-50 text-green-900 ring ring-green-200'
						: 'border-stone-200 bg-stone-50'}"
					id={device.id}>
					<IconDevice deviceType={device.type} />
					{device.name}
				</button>
			{/if}
		{/each}

		<div class="mt-2 flex justify-end gap-3 font-general font-medium tracking-wide">
			<button
				on:click={() => cancel()}
				class="inline-flex items-center justify-center rounded-full
                    border border-stone-200 bg-stone-100 px-4 py-3 font-medium leading-none text-stone-600 hover:bg-stone-200">
				Cancel
			</button>
			<button
				on:click={() => addToQueue($value)}
				class="inline-flex items-center justify-center gap-1 rounded-full
                    bg-orange-300 px-4 py-3 font-medium leading-none text-orange-900 hover:bg-orange-400">
				<IconPlus />
				<span>Add</span>
			</button>
		</div>
	{/if}
</div>

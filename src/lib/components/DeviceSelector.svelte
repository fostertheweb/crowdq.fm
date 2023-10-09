<script lang="ts">
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';

	export let devices: Array<Device> | undefined;

	const {
		elements: { root, item },
		helpers: { isChecked }
	} = createRadioGroup({
		defaultValue: 'default'
	});
</script>

<div
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
	aria-label="View density">
	{#if !devices || devices.length === 0}
		<div
			class="flex flex-col items-center justify-center gap-4 rounded bg-stone-100 p-4 dark:bg-stone-700 dark:text-stone-400">
			<div>No active devices found. Open the Spotify app and return to crowdq.fm</div>
			<a
				href="spotify"
				class="rounded-full bg-green-500 px-3 py-2 font-general font-medium text-white"
				>Open Spotify</a>
		</div>
	{:else}
		{#each devices as device}
			{#if device.id}
				<div class="flex items-center gap-3">
					<button
						use:melt={$item(device.id)}
						class="hover:bg-magnum-100 grid h-6 w-6 cursor-default place-items-center rounded-full bg-white
      shadow-sm"
						id={device.id}
						aria-labelledby="{device.id}-label">
						{#if $isChecked(device.id)}
							<div class="bg-magnum-500 h-3 w-3 rounded-full" />
						{/if}
					</button>
					<label
						class="text-magnum-900 font-medium capitalize leading-none"
						for={device.id}
						id="{device.id}-label">
						{device.name}
					</label>
				</div>
			{/if}
		{/each}
	{/if}
</div>

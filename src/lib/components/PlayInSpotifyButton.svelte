<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import IconPlay from '$lib/components/icons/IconPlay.svelte';

	import type { Device } from '@fostertheweb/spotify-web-api-ts-sdk';
	import DeviceSelector from './DeviceSelector.svelte';
	import { Spotify } from '$lib/spotify';
	import { playQueue } from '$lib/stores/queue';
	import IconX from './icons/IconX.svelte';

	export let disabled = true;
	export let devices: Device[] | undefined;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog();

	function addToQueue(deviceId: string) {
		const additions = $playQueue.map((item) => {
			const uri = `spotify:track:${item.providerId}`;
			return Spotify.player.addItemToPlaybackQueue(uri, deviceId);
		});

		Promise.all(additions).then(() => {
			$open = false;
		});
	}

	function cancel() {
		$open = false;
	}
</script>

<button
	use:melt={$trigger}
	{disabled}
	class="flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 text-sm text-white hover:text-white hover:brightness-125 disabled:opacity-60 dark:bg-green-600 dark:text-white">
	<IconPlay lg={false} />
	<span class="font-general font-medium tracking-wide">Play in Spotify</span>
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
            p-6 pt-2 shadow-lg"
			use:melt={$content}>
			<h3
				use:melt={$title}
				class="m-0 text-center font-general text-base font-medium tracking-wide text-stone-500">
				Select Spotify Device
			</h3>
			<div class="h-4" />

			<DeviceSelector {devices} {addToQueue} {cancel} />
		</div>
	{/if}
</div>
